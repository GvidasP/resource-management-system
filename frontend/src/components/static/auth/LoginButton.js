import React from "react";
import Button from "@material-ui/core/Button";

const LoginButton = (props) => {
    const handleLoginButton = () => {
        window.open("http://localhost:5000/api/auth/google", "_self");
    };
    return (
        <Button onClick={handleLoginButton} className={props.style}>
            Prisijungti
        </Button>
    );
};

export default LoginButton;
