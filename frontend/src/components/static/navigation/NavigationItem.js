import React from "react";

import { Link } from "react-router-dom";
import { ListItem, ListItemText, ListItemIcon } from "@material-ui/core";

const NavigationItem = ({ to, icon, text, isAuthenticated }) => {
    if (isAuthenticated)
        return (
            <ListItem button component={Link} to={to} key={to}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
            </ListItem>
        );
    return null;
};

export default NavigationItem;
