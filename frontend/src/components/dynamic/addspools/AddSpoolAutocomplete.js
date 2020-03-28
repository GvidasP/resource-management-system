import React from "react";

import TextField from "@material-ui/core/TextField";
import Autocomplete, {
    createFilterOptions
} from "@material-ui/lab/Autocomplete";

const filter = createFilterOptions();

const AddSpoolAutocomplete = ({
    id,
    value,
    toggleOpen,
    setDialogValue,
    handleChange,
    options,
    textFieldLabel
}) => {
    return (
        <Autocomplete
            value={value}
            // size="small"
            onChange={(event, newValue) => {
                if (typeof newValue === "string") {
                    setTimeout(() => {
                        toggleOpen(true);
                        setDialogValue({
                            title: newValue
                        });
                    });
                    return;
                }

                if (newValue && newValue.inputValue) {
                    toggleOpen(true);
                    setDialogValue({
                        title: newValue.inputValue
                    });

                    return;
                }
                if (newValue) {
                    handleChange(newValue.title);
                }
                handleChange(newValue);
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                if (params.inputValue !== "") {
                    filtered.push({
                        inputValue: params.inputValue,
                        title: `Pridėti "${params.inputValue}"`
                    });
                }

                return filtered;
            }}
            id={id}
            options={options}
            getOptionLabel={option => {
                if (typeof option === "string") {
                    return option;
                }
                if (option.inputValue) {
                    return option.inputValue;
                }
                return option.title;
            }}
            renderOption={option => option.title}
            freeSolo
            renderInput={params => (
                <TextField
                    {...params}
                    label={textFieldLabel}
                    variant="standard"
                />
            )}
        />
    );
};

export default AddSpoolAutocomplete;
