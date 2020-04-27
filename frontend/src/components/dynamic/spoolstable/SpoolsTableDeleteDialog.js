import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

const SpoolsTableDeleteDialog = ({
    deleteDialogVisibility,
    toggleDeleteDialog,
    handleDeleteSpools,
}) => {
    const handleDelete = () => {
        toggleDeleteDialog();
        handleDeleteSpools();
    };
    return (
        <Dialog open={deleteDialogVisibility} onClose={toggleDeleteDialog}>
            <DialogTitle>Ričių ištrynimas</DialogTitle>
            <DialogContent>
                <Typography>
                    Ar tikrai norite ištrinti pasirinktas rites iš duomenų
                    bazės?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={toggleDeleteDialog}>Atšaukti</Button>
                <Button onClick={handleDelete}>Patvirtinti</Button>
            </DialogActions>
        </Dialog>
    );
};

export default SpoolsTableDeleteDialog;
