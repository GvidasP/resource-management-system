import React from "react";
import {
    ListItem,
    ListItemText,
    ListItemIcon,
    makeStyles,
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { API_URL } from "../../../utils/api";

const useStyles = makeStyles({
    itemContainer: {
        marginTop: "1.5rem",
    },
});

const LogoutItem = () => {
    const classes = useStyles();

    return (
        <ListItem
            button
            component="a"
            href={`${API_URL}/auth/logout`}
            className={classes.itemContainer}
        >
            <ListItemIcon>
                <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Atsijungti" />
        </ListItem>
    );
};

export default LogoutItem;
