import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Typography, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: "18.75rem",
    },
    paperContent: {
        padding: theme.spacing(1.5),
    },
    headings: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    heading: {
        maxWidth: "4.5rem",
    },
    details: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    id: {
        fontSize: 17,
        fontWeight: "bold",
        marginTop: theme.spacing(1),
    },
    actions: {},
    removeButton: {
        borderColor: theme.palette.info.light,
        fontSize: "0.70rem",
    },
}));

const AddSpoolPaper = ({ spool, handleRemoveSpool }) => {
    const classes = useStyles();
    const { manufacturer, plasticType, color, weight, index } = spool;
    return (
        <Paper className={classes.root}>
            <div className={classes.paperContent}>
                <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="subtitle2"
                    className={classes.paperTitle}
                >
                    Ritė
                </Typography>
                <div className={classes.headings}>
                    <Typography
                        variant="caption"
                        align="center"
                        className={classes.heading}
                    >
                        Gamintojas
                    </Typography>
                    <Typography
                        variant="caption"
                        align="center"
                        className={classes.heading}
                    >
                        Plastiko tipas
                    </Typography>
                    <Typography
                        variant="caption"
                        align="center"
                        className={classes.heading}
                    >
                        Spalva
                    </Typography>
                    <Typography
                        variant="caption"
                        align="center"
                        className={classes.heading}
                    >
                        Svoris (g)
                    </Typography>
                </div>
                <div className={classes.details}>
                    <Typography align="center">{manufacturer}</Typography>
                    <Typography align="center">{plasticType}</Typography>
                    <Typography align="center">{color}</Typography>
                    <Typography align="center">{weight}</Typography>
                </div>
                <Typography className={classes.id} align="center">
                    {index}
                </Typography>
                <div className={classes.actions}>
                    <Button
                        variant="outlined"
                        className={classes.removeButton}
                        onClick={handleRemoveSpool}
                    >
                        Pašalinti
                    </Button>
                </div>
            </div>
        </Paper>
    );
};

export default AddSpoolPaper;
