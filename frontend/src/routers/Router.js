import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/api";

import AuthenticatedRoute from "./auth/AuthenticatedRoute";
import App from "../App";
import Header from "../components/static/Header";
import AddSpool from "../components/dynamic/addspools/AddSpool";
import LandingPage from "../components/static/LandingPage";

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
            <Header isAuthenticated={isAuthenticated} />
            <Switch>
                <AuthenticatedRoute
                    exact
                    path="/view"
                    component={App}
                    appProps={{ isAuthenticated, user }}
                />
                <AuthenticatedRoute
                    path="/add"
                    component={AddSpool}
                    appProps={{ isAuthenticated, user }}
                />
                <Route
                    exact
                    path="/"
                    render={(props) => (
                        <LandingPage
                            {...props}
                            isAuthenticated={isAuthenticated}
                        />
                    )}
                />
            </Switch>
        </BrowserRouter>
    );
};

export default Router;
