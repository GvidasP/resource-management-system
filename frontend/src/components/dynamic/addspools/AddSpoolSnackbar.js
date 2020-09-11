import React from "react";

import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const AddSpoolSnackbar = ({ open, message, severity, onClose }) => {
    return (
        <Snackbar open={open} autoHideDuration={5000} onClose={onClose}>
            <Alert severity={severity} onClose={onClose}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default AddSpoolSnackbar;
