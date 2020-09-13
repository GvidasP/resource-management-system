import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/api";

import UnauthenticatedRoute from "./auth/UnauthenticatedRoute";
import AuthenticatedRoute from "./auth/AuthenticatedRoute";
import App from "../App";
import Header from "../components/static/Header";
import AddSpool from "../components/dynamic/addspools/AddSpool";
import LoginPage from "../components/static/auth/LoginPage";

const Router = () => {
    const [isAuthenticated, userHasAuthenticated] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            await axios
                .get(`${API_URL}/auth/login/success`, {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Credentials": true,
                    },
                    withCredentials: true,
                })
                .then((response) => {
                    userHasAuthenticated(true);
                    setUser(response.data.user);
                })
                .catch((error) => console.log(error));
        };
        fetchData();
    }, []);

    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <AuthenticatedRoute
                    exact
                    path="/"
                    component={App}
                    appProps={{ isAuthenticated, user }}
                />
                <AuthenticatedRoute
                    path="/add"
                    component={AddSpool}
                    appProps={{ isAuthenticated, user }}
                />
                <UnauthenticatedRoute
                    path="/login"
                    component={LoginPage}
                    appProps={{ isAuthenticated, userHasAuthenticated }}
                />
            </Switch>
        </BrowserRouter>
    );
};

export default Router;
