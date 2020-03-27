import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "../App";
import Header from "../components/static/Header";
import AddSpool from "../components/dynamic/addspools/AddSpool";

const Router = () => (
    <BrowserRouter>
        <Header />
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/add" component={AddSpool} />
        </Switch>
    </BrowserRouter>
);

export default Router;
