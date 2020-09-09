import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

const SpoolsTablePrintingDialog = ({
    printingDialogVisibility,
    togglePrintingDialog,
    numSelected,
    handlePrinting,
}) => {
    return (
        <Dialog open={printingDialogVisibility} onClose={togglePrintingDialog}>
            <DialogTitle>Spausdinimas</DialogTitle>
            <DialogContent>
                <Typography>
                    Ar tikrai norite atlikti spausdinimą su pasirinktomis{" "}
                    {numSelected} ritėmis?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={togglePrintingDialog}>Atšaukti</Button>
                <Button onClick={handlePrinting}>Spausdinti</Button>
            </DialogActions>
        </Dialog>
    );
};

export default SpoolsTablePrintingDialog;
