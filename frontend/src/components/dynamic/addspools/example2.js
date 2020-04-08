/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Autocomplete, {
    createFilterOptions,
} from "@material-ui/lab/Autocomplete";

import axios from "axios";
import { API_URL } from "../../../utils/api";

const filter = createFilterOptions();

export default function ManufacturerAutocomplete({ options }) {
    const [value, setValue] = React.useState(null);
    const [open, toggleOpen] = React.useState(false);

    const handleClose = () => {
        setDialogValue({
            title: "",
        });

        toggleOpen(false);
    };

    const [dialogValue, setDialogValue] = React.useState({
        title: "",
    });

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     setValue({
    //         title: dialogValue.title,
    //     });

    //     handleClose();
    // };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post(`${API_URL}/statistics/update/`, {
                manufacturers: { title: dialogValue.title },
            })
            .then((result) => {
                // TODO: reikia fetchinti naujus duomenis is API, siuo atveju padaryta tik su setIsLoading
                const element = result.data[0].manufacturers.find(
                    (item) => item.title === dialogValue.title
                );
                setValue({
                    title: dialogValue.title,
                    ...element,
                });
                console.log(element);
            })
            .catch((error) => console.log(error));
        handleClose();
    };

    return (
        <React.Fragment>
            <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                    if (typeof newValue === "string") {
                        // timeout to avoid instant validation of the dialog's form.
                        setTimeout(() => {
                            toggleOpen(true);
                            setDialogValue({
                                title: newValue,
                            });
                        });
                        return;
                    }

                    if (newValue && newValue.inputValue) {
                        toggleOpen(true);
                        setDialogValue({
                            title: newValue.inputValue,
                        });

                        return;
                    }

                    setValue(newValue);
                }}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    if (params.inputValue !== "") {
                        filtered.push({
                            inputValue: params.inputValue,
                            title: `Add "${params.inputValue}"`,
                        });
                    }

                    return filtered;
                }}
                id="free-solo-dialog-demo"
                options={options}
                getOptionLabel={(option) => {
                    // e.g value selected with enter, right from the input
                    if (typeof option === "string") {
                        return option;
                    }
                    if (option.inputValue) {
                        return option.inputValue;
                    }
                    return option.title;
                }}
                renderOption={(option) => option.title}
                style={{ width: 300 }}
                freeSolo
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Free solo dialog"
                        variant="outlined"
                    />
                )}
            />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <form onSubmit={handleSubmit}>
                    <DialogTitle id="form-dialog-title">
                        Add a new film
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Did you miss any film in our list? Please, add it!
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            value={dialogValue.title}
                            onChange={(event) =>
                                setDialogValue({
                                    ...dialogValue,
                                    title: event.target.value,
                                })
                            }
                            label="title"
                            type="text"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
            <Button onClick={() => console.log(value)}>TEST</Button>
        </React.Fragment>
    );
}
