import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AuthenticatedRoute from "./auth/AuthenticatedRoute";

import App from "../App";
import Header from "../components/static/Header";
import AddSpool from "../components/dynamic/addspools/AddSpool";
import LoginPage from "../components/static/auth/LoginPage";

const Router = () => {
    const [isAuthenticated, userHasAuthenticated] = React.useState(true);
    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <AuthenticatedRoute
                    exact
                    path="/"
                    component={App}
                    appProps={{ isAuthenticated }}
                />
                <AuthenticatedRoute
                    path="/add"
                    component={AddSpool}
                    appProps={{ isAuthenticated }}
                />
                {/* <UnauthenticatedRoute
                    path="/login"
                    component={LoginPage}
                    appProps={{ isAuthenticated, userHasAuthenticated }}
                /> */}
                <Route path="/login" component={LoginPage} />
            </Switch>
        </BrowserRouter>
    );
};

export default Router;
