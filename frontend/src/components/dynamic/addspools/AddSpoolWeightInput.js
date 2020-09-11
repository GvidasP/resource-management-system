import React from "react";

import TextField from "@material-ui/core/TextField";

const AddSpoolWeightInput = ({ handleChange, classes, values }) => {
    return (
        <TextField
            id="weight-textfield"
            label="Svoris (g)"
            fullWidth
            onChange={handleChange}
            className={classes}
            value={values && values.weight}
        />
    );
};

export default AddSpoolWeightInput;
