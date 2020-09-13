import React from "react";

import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const LoginPage = ({ isAuthenticated }) => {
    // const [loading, setLoading] = useState(true);

    return <div>{isAuthenticated ? <LogoutButton /> : <LoginButton />}</div>;
};

export default LoginPage;
