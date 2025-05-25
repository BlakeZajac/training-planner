import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const code = req.query.code;
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

    const data = await response.json();

    const { access_token, refresh_token, expires_at, athlete } = data;

    // Insert or update user in Supabase
    await supabase.from("users").upsert({
        id: athlete.id,
        created_at: new Date(),
        username: athlete.username,
        firstname: athlete.firstname,
        lastname: athlete.lastname,
        access_token,
        refresh_token,
        token_expires_at: expires_at,
    });

    // Create a JWT token for the session
    const token = jwt.sign(
        {
            id: athlete.id,
            name: `${athlete.firstname} ${athlete.lastname}`,
        },
        process.env.JWT_SECRET!,
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
        })
    );

    // Redirect to the dashboard
    res.redirect("/dashboard");
}
