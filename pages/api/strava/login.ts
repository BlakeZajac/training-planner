import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const redirect_uri = process.env.STRAVA_REDIRECT_URI;
    const client_id = process.env.STRAVA_CLIENT_ID;

    const stravaUrl = `https://www.strava.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=read,activity:read_all,profile:read_all`;

    res.redirect(stravaUrl);
}
