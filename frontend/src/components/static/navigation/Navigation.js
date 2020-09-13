import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    makeStyles,
    ListItemIcon,
} from "@material-ui/core";

import Menu from "@material-ui/icons/Menu";
import AddIcon from "@material-ui/icons/Add";
import PageviewIcon from "@material-ui/icons/Pageview";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import BusinessIcon from "@material-ui/icons/Business";

const useStyles = makeStyles({
    list: {
        width: 350,
    },
    menuIcon: {
        color: "white",
        "&:hover": {
            cursor: "pointer",
        },
    },
});

const Navigation = ({ isAuthenticated }) => {
    const classes = useStyles();
    const [isVisible, setIsVisible] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setIsVisible(open);
    };

    return (
        <div>
            <Menu
                onClick={toggleDrawer(true)}
                fontSize={"large"}
                className={classes.menuIcon}
            />
            <Drawer open={isVisible} onClose={toggleDrawer(false)}>
                <div
                    className={classes.list}
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <List>
                        {[
                            {
                                to: "/",
                                icon: <BusinessIcon />,
                                text: "Pradinis",
                            },
                            { to: "/add", icon: <AddIcon />, text: "Pridėti" },
                            {
                                to: "/view",
                                icon: <PageviewIcon />,
                                text: "Peržiūrėti",
                            },
                            {
                                to: "/login",
                                icon: <ExitToAppIcon />,
                                text: "Prisijungti",
                            },
                        ].map(({ to, icon, text }) => (
                            <ListItem button component={Link} to={to} key={to}>
                                <ListItemIcon>{icon}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                        {isAuthenticated && (
                            <ListItem
                                button
                                component="a"
                                href="http://localhost:5000/api/auth/logout"
                            >
                                <ListItemIcon>
                                    <ExitToAppIcon />
                                </ListItemIcon>
                                <ListItemText primary="Atsijungti" />
                            </ListItem>
                        )}
                    </List>
                </div>
            </Drawer>
        </div>
    );
};

export default Navigation;
