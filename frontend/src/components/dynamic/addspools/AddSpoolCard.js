import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 250,
        maxWidth: 350,
        marginBottom: theme.spacing(2)
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)"
    },
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12
    },
    info: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        fontSize: 16
    },
    headings: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    }
}));

const AddSpoolCard = ({ values }) => {
    const classes = useStyles();
    const { manufacturer, plasticType, color, weight } = values;

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="subtitle2"
                >
                    Ritė
                </Typography>
                <Typography
                    variant="caption"
                    className={classes.headings}
                    align="center"
                >
                    <span>Gamintojas</span>
                    <span>Plastiko tipas</span>
                    <span>Spalva</span>
                    <span>Svoris(g)</span>
                </Typography>
                <Typography
                    // variant="h6"
                    className={classes.info}
                    align="center"
                >
                    <span>{manufacturer}</span>
                    <span>{plasticType}</span>
                    <span>{color}</span>
                    <span>{weight}</span>
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" variant="outlined">
                    Pašalinti
                </Button>
            </CardActions>
        </Card>
    );
};

export default AddSpoolCard;
