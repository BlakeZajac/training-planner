import jwt from "jsonwebtoken";

export function getUser() {
    const cookie = document.cookie;
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
