import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Validate required environment variables
        if (!process.env.STRAVA_CLIENT_ID || !process.env.STRAVA_CLIENT_SECRET || !process.env.JWT_SECRET) {
            throw new Error("Missing required Strava or JWT environment variables");
        }

        const code = req.query.code;
        if (!code) {
            console.error("No authorisation code provided");
            throw new Error("No authorisation code provided");
        }

        const client_id = process.env.STRAVA_CLIENT_ID;
        const client_secret = process.env.STRAVA_CLIENT_SECRET;

        // Exchange the code for an access token
        const response = await fetch("https://www.strava.com/oauth/token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                client_id,
                client_secret,
                code,
                grant_type: "authorization_code",
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Strava token exchange failed:", errorData);
            throw new Error(`Failed to exchange token: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.access_token || !data.athlete) {
            console.error("Invalid response from Strava:", data);
            throw new Error("Invalid response from Strava");
        }

        console.log("Token exchange successful:", data);
        const { access_token, refresh_token, expires_at, athlete } = data;

        // Insert or update user in Supabase
        const { error: upsertError } = await supabase.from("users").upsert({
            id: athlete.id,
            created_at: new Date(),
            username: athlete.username,
            firstname: athlete.firstname,
            lastname: athlete.lastname,
            access_token,
            refresh_token,
            token_expires_at: expires_at,
        });

        if (upsertError) {
            console.error("Failed to upsert user:", upsertError);
            throw new Error("Failed to save user data");
        }

        console.log("User upserted successfully");

        // Create a JWT token for the session
        const token = jwt.sign(
            {
                id: athlete.id,
                username: athlete.username,
                firstname: athlete.firstname,
                lastname: athlete.lastname,
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // Set the cookie
        res.setHeader(
            "Set-Cookie",
            serialize("session", token, {
                path: "/",
                httpOnly: true,
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60, // 7 days
                secure: process.env.NODE_ENV === "production",
            })
        );

        console.log("Cookie set successfully");
        res.redirect("/");
    } catch (error) {
        console.error("Error in Strava callback:", error);
        res.status(500).json({
            error: "Authentication failed",
            message: error instanceof Error ? error.message : "Unknown error occurred",
        });
    }
}
