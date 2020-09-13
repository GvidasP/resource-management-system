import React from "react";
import { GoogleLogout } from "react-google-login";

const LogoutButton = ({ userHasAuthenticated }) => {
    const logout = userHasAuthenticated(false);

    return (
        <GoogleLogout
            clientId="418890674873-o2b40alq0cudvp4dc60lgfr5ii7tfv6h.apps.googleusercontent.com"
            buttonText="Logout"
            onLogoutSuccess={logout}
        />
    );
};

export default LogoutButton;
