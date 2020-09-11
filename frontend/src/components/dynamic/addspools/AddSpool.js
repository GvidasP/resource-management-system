import React from "react";

import { makeStyles } from "@material-ui/core";
import spoolsContext from "../../../state/spoolsContext";

import AddSpoolForm from "./AddSpoolForm";

const useStyles = makeStyles((theme) => ({
    pageTitle: {
        color: theme.palette.text.primary,
    },
}));

const AddSpool = () => {
    const classes = useStyles();
    const [spools, setSpools] = React.useState([]);
    const value = { spools, setSpools };

    return (
        <spoolsContext.Provider value={value}>
            <div className="container">
                <h1 className={classes.pageTitle}>Ritės pridėjimas</h1>
                <AddSpoolForm />
            </div>
        </spoolsContext.Provider>
    );
};

export default AddSpool;
