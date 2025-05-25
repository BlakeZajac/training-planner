import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (!process.env.STRAVA_REDIRECT_URI || !process.env.STRAVA_CLIENT_ID) {
            throw new Error("Missing required Strava environment variables");
        }

        const redirect_uri = process.env.STRAVA_REDIRECT_URI;
        const client_id = process.env.STRAVA_CLIENT_ID;

        const stravaUrl = `https://www.strava.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=read,activity:read_all,profile:read_all`;

        res.redirect(stravaUrl);
    } catch (error) {
        console.error("Error in Strava login:", error);
        res.status(500).json({
            error: "Authentication failed",
            message: error instanceof Error ? error.message : "Unknown error occurred",
        });
    }
}
