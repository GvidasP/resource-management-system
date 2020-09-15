import React from "react";
import LoginButton from "./auth/LoginButton";
import LogoutButton from "./auth/LogoutButton";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    pageTitle: {
        fontSize: "5rem",
    },
    subTitle: {
        fontSize: "2.5rem",
    },
    container: {
        textAlign: "center",
    },
    button: {
        marginTop: "2rem",
        fontSize: "1.2rem",
    },
});

const LandingPage = ({ isAuthenticated }) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <h1 className={classes.pageTitle}>3D Creative</h1>
            <h3 className={classes.subTitle}>Medžiagų valdymo sistema</h3>
            {isAuthenticated ? (
                <LogoutButton style={classes.button} />
            ) : (
                <LoginButton style={classes.button} />
            )}
        </div>
    );
};

export default LandingPage;
