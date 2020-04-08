import React from "react";

import { makeStyles } from "@material-ui/core";

import AddSpoolForm from "./AddSpoolForm";

const useStyles = makeStyles((theme) => ({
    pageTitle: {
        color: theme.palette.text.primary,
    },
}));

const AddSpool = () => {
    const classes = useStyles();
    return (
        <div className="container">
            <h1 className={classes.pageTitle}>Ritės pridėjimas</h1>
            <AddSpoolForm />
        </div>
    );
};

export default AddSpool;
