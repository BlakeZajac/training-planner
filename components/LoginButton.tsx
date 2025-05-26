import { useAuth } from "@/lib/useAuth";
import { Button } from "@/components/ui/button";

import { FaStrava } from "react-icons/fa";

const LoginButton = () => {
    const auth = useAuth();

    const handleOnClick = () => {
        if (!auth) {
            window.location.href = "/api/auth/strava/login";
        }
    };

    return (
        <Button variant="default" className="" onClick={handleOnClick}>
            {!auth && <FaStrava />}
            <span>{auth ? `Welcome` : "Login with Strava"}</span>
        </Button>
    );
};

export default LoginButton;
