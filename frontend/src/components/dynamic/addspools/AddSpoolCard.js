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
        marginBottom: theme.spacing(2)
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
    },
    id: {
        fontWeight: "bold",
        marginTop: theme.spacing(1)
    }
}));

const AddSpoolCard = ({ spool, handleRemoveSpool }) => {
    const classes = useStyles();
    const { index, manufacturer, plasticType, color, weight } = spool;

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
                {/* <Typography className={classes.info} align="center">
                    <span>{manufacturer}</span>
                    <span>{plasticType}</span>
                    <span>{color}</span>
                    <span>{weight}</span>
                </Typography> */}
                <div className={classes.info}>
                    <Typography align="center">{manufacturer}</Typography>
                    <Typography align="center">{plasticType}</Typography>
                    <Typography align="center">{color}</Typography>
                    <Typography align="center">{weight}</Typography>
                </div>
                <Typography className={classes.id} align="center">
                    {spool.index}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    color="primary"
                    variant="outlined"
                    onClick={handleRemoveSpool(index)}
                >
                    Pašalinti
                </Button>
            </CardActions>
        </Card>
    );
};

export default AddSpoolCard;
