import React from "react";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

const AddNewTypeDialog = ({
    open,
    handleClose,
    handleSubmit,
    dialogValue,
    setDialogValue,
    textFieldLabel,
    dialogTitle
}) => {
    return (
        <Dialog
            fullWidth
            maxWidth="lg"
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
        >
            <form onSubmit={handleSubmit}>
                <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        value={dialogValue.title}
                        onChange={event => {
                            setDialogValue({
                                title: event.target.value
                            });
                        }}
                        label={textFieldLabel}
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Atšaukti
                    </Button>
                    <Button type="submit" color="primary">
                        Pridėti
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AddNewTypeDialog;
