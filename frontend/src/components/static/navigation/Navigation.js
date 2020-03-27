import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    makeStyles,
    ListItemIcon
} from "@material-ui/core";

import Menu from "@material-ui/icons/Menu";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import PageviewIcon from "@material-ui/icons/Pageview";
import PrintIcon from "@material-ui/icons/Print";

const useStyles = makeStyles({
    list: {
        width: 350
    }
});

const Navigation = () => {
    const classes = useStyles();
    const [isVisible, setIsVisible] = useState(false);

    const toggleDrawer = open => event => {
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
                        <ListItem button component={Link} to="/add">
                            <ListItemIcon>
                                <AddIcon />
                            </ListItemIcon>
                            <ListItemText primary="Pridėti" />
                        </ListItem>
                        <ListItem button component={Link} to="/">
                            <ListItemIcon>
                                <RemoveIcon />
                            </ListItemIcon>
                            <ListItemText primary="Šalinti" />
                        </ListItem>
                        <ListItem button component={Link} to="/">
                            <ListItemIcon>
                                <PageviewIcon />
                            </ListItemIcon>
                            <ListItemText primary="Peržiūrėti" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <PrintIcon />
                            </ListItemIcon>
                            <ListItemText primary="3D spausdinimas" />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
        </div>
    );
};

export default Navigation;
