import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";

import SpoolsTableFiltersDialogForm from "./SpoolsTableFiltersDialogForm";
import SpoolsTableFiltersWeightSlider from "./SpoolsTableFiltersWeightSlider";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

const SpoolsTableFiltersDialog = ({
    filtersVisibility,
    toggleFilters,
    statistics,
    filters,
    setFilters,
    applyFilters,
}) => {
    const classes = useStyles();

    const handleChange = (prop) => (event) => {
        setFilters((filters) => ({ ...filters, [prop]: event.target.value }));
    };

    const handleWeightChange = (event, newValue) => {
        setFilters((filters) => ({ ...filters, weight: newValue }));
    };

    const filtersSelects = [
        {
            labelId: "manufacturers-label",
            label: "Gamintojai",
            selectId: "manufacturers",
            filters: filters.manufacturers,
            onChange: handleChange("manufacturers"),
            input: <Input />,
            renderValue: (selected) => selected.join(", "),
            items: statistics.manufacturers,
        },
        {
            labelId: "plasticTypes-label",
            label: "Plastiko tipai",
            selectId: "plasticTypes",
            filters: filters.plasticTypes,
            onChange: handleChange("plasticTypes"),
            input: <Input />,
            renderValue: (selected) => selected.join(", "),
            items: statistics.plasticTypes,
        },
        {
            labelId: "colors-label",
            label: "Spalvos",
            selectId: "colors",
            filters: filters.colors,
            onChange: handleChange("colors"),
            input: <Input />,
            renderValue: (selected) => selected.join(", "),
            items: statistics.colors,
        },
    ];

    return (
        <Dialog
            open={filtersVisibility}
            onClose={toggleFilters}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>Filtrai</DialogTitle>
            <DialogContent>
                <form className={classes.container}>
                    {filtersSelects.map((select) => (
                        <SpoolsTableFiltersDialogForm
                            select={select}
                            key={select.selectId}
                        />
                    ))}
                    <FormControl className={classes.formControl}>
                        <Typography
                            id="range-slider"
                            gutterBottom
                            color="textSecondary"
                        >
                            Svoris
                        </Typography>
                        <SpoolsTableFiltersWeightSlider
                            value={filters.weight}
                            handleWeightChange={handleWeightChange}
                            classes={classes}
                        />
                    </FormControl>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={toggleFilters}>Atšaukti</Button>
                <Button onClick={applyFilters}>Pritaikyti</Button>
            </DialogActions>
        </Dialog>
    );
};

export default SpoolsTableFiltersDialog;
