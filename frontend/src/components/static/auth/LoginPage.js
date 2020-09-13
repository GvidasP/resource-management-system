import React, { useState, useEffect } from "react";
import axios from "axios";

import { API_URL } from "../../../utils/api";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const LoginPage = () => {
    const [isAuthenticated, userHasAuthenticated] = useState(false);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await axios
                .get(`${API_URL}/auth/login/success`, {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Credentials": true,
                    },
                })
                .then((response) => {
                    if (response === 200) {
                        console.log(response);
                        console.log("200");
                        return response.json();
                    }
                    throw new Error("Failed to authenticate the user.");
                })
                .then((responseJson) => {
                    userHasAuthenticated(true);
                    setUser(responseJson.user);
                    console.log("responseJson");
                    setLoading(false);
                })
                .catch((error) => console.log(error));
        };
        fetchData();
    }, [loading]);

    return (
        <div>
            {console.log(user)}
            {loading && <h1>loading</h1>}
            <LoginButton />
        </div>
    );
};

export default LoginPage;
