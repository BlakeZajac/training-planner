"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUser } from "@/lib/getUser";

import Container from "@/components/Container";
import { Button } from "@/components/ui/button";

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const user = getUser();
        setIsLoggedIn(!!user);
    }, []);

    return (
        <header className="site-header">
            <Container className="site-header__container">
                <div className="site-header__actions">{!isLoggedIn && <Button variant="default">Login</Button>}</div>
            </Container>
        </header>
    );
};

export default Header;
