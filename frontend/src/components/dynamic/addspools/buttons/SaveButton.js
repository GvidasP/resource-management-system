import React from "react";
import axios from "axios";

import Button from "@material-ui/core/Button";
import SaveAltIcon from "@material-ui/icons/SaveAlt";

import { API_URL } from "../../../../utils/api";
import AddSpoolSnackbar from "../AddSpoolSnackbar";

const SaveButton = ({ spools, error }) => {
    const [snackbar, toggleSnackbar] = React.useState(false);
    const handleSaveButton = () => {
        if (!error && spools.length) {
            handleSnackbar();
            axios
                .post(`${API_URL}/spools/`, spools)
                .then()
                .catch((err) => console.error(err));
        }
    };
    const handleSnackbar = () => {
        toggleSnackbar((prev) => !prev);
    };
    return (
        <React.Fragment>
            <AddSpoolSnackbar
                open={snackbar}
                message="Ritės sėkmingai išssaugotos"
                severity="success"
                onClose={handleSnackbar}
            />
            <Button
                color="secondary"
                variant="contained"
                startIcon={<SaveAltIcon />}
                onClick={handleSaveButton}
                disabled={!spools.length}
            >
                Įrašyti
            </Button>
        </React.Fragment>
    );
};

export default SaveButton;
