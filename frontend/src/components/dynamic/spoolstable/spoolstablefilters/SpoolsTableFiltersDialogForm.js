import React from "react";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

const SpoolsTableFiltersDialogForm = ({ select }) => {
    const classes = useStyles();
    return (
        <FormControl className={classes.formControl}>
            <InputLabel id={select.labelId}>{select.label}</InputLabel>
            <Select
                labelId={select.labelId}
                id={select.selectId}
                value={select.filters}
                onChange={select.onChange}
                input={select.input}
                renderValue={select.renderValue}
                multiple
            >
                {select.items.map((item) => (
                    <MenuItem value={item.title} key={item.id}>
                        <Checkbox
                            checked={select.filters.indexOf(item.title) > -1}
                        />
                        <ListItemText primary={item.title} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SpoolsTableFiltersDialogForm;
