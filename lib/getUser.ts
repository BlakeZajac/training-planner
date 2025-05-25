import { NextApiRequest } from "next";
import jwt from "jsonwebtoken";

export function getUser(req: NextApiRequest) {
    const cookie = req.headers.cookie;
    if (!cookie) return null;

    const match = cookie.match(/session=([^;]+)/);
    if (!match) return null;

    try {
        return jwt.verify(match[1], process.env.JWT_SECRET!);
    } catch (error) {
        console.error(`Error verifying session token from cookie: ${error}`);
        return null;
    }
}
