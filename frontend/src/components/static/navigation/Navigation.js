import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { Drawer, List, makeStyles } from "@material-ui/core";

import Menu from "@material-ui/icons/Menu";
import AddIcon from "@material-ui/icons/Add";
import PageviewIcon from "@material-ui/icons/Pageview";
import BusinessIcon from "@material-ui/icons/Business";
import NavigationItem from "./NavigationItem";
import LogoutItem from "./LogoutItem";

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

const listItems = [
    {
        to: "/",
        icon: <BusinessIcon />,
        text: "Pradinis",
        authenticated: false,
    },
    { to: "/add", icon: <AddIcon />, text: "Pridėti", authenticated: true },
    {
        to: "/view",
        icon: <PageviewIcon />,
        text: "Peržiūrėti",
        authenticated: true,
    },
];

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
                        {listItems.map(({ to, icon, text }) => (
                            <NavigationItem
                                to={to}
                                icon={icon}
                                text={text}
                                isAuthenticated={isAuthenticated}
                                key={text}
                            />
                        ))}
                        <LogoutItem />
                    </List>
                </div>
            </Drawer>
        </div>
    );
};

export default Navigation;
