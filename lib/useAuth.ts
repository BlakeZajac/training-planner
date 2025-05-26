import { useEffect, useState } from "react";
import jwt, { JwtPayload } from "jsonwebtoken";

export function useAuth(): JwtPayload | null {
    const [user, setUser] = useState<JwtPayload | null>(null);

    useEffect(() => {
        const cookie = document.cookie;
        const match = cookie.match(/session=([^;]+)/);

        console.log("Cookie:", cookie);
        console.log("Match:", match);
        if (!match) return;

        try {
            const decoded = jwt.verify(match[1], process.env.JWT_SECRET!) as JwtPayload;
            setUser(decoded.user);
        } catch (error) {
            console.error(`Error verifying session token: ${error}`);
        }
    }, []);

    return user;
}
