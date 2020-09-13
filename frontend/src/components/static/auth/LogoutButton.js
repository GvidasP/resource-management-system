import React from "react";
import Button from "@material-ui/core/Button";

const LogoutButton = () => {
    const handleLogoutButton = () => {
        window.open("http://localhost:5000/api/auth/logout", "_self");
    };
    return <Button onClick={handleLogoutButton}>Atsijungti</Button>;
};

export default LogoutButton;
