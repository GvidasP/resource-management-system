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

const useStyles = makeStyles({
    list: {
        width: 350,
    },
});

const Navigation = () => {
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
                style={{ color: "white" }}
            />
            <Drawer open={isVisible} onClose={toggleDrawer(false)}>
                <div
                    className={classes.list}
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <List>
                        {[
                            { to: "/add", icon: <AddIcon />, text: "Pridėti" },
                            {
                                to: "/",
                                icon: <PageviewIcon />,
                                text: "Peržiūrėti",
                            },
                        ].map(({ to, icon, text }) => (
                            <ListItem button component={Link} to={to} key={to}>
                                <ListItemIcon>{icon}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>
        </div>
    );
};

export default Navigation;
