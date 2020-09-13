import React from "react";
import LoginButton from "./auth/LoginButton";
import LogoutButton from "./auth/LogoutButton";

const LandingPage = ({ isAuthenticated }) => {
    return (
        <div>
            <h1>3D Creative</h1>
            <h3>Medžiagų valdymo sistema</h3>
            {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </div>
    );
};

export default LandingPage;
