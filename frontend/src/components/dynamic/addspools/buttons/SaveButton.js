import React from "react";
import axios from "axios";

import Button from "@material-ui/core/Button";
import SaveAltIcon from "@material-ui/icons/SaveAlt";

import { API_URL } from "../../../../utils/api";

const SaveButton = ({ spools, error }) => {
    const handleSaveButton = () => {
        if (!error && spools.length) {
            axios
                .post(`${API_URL}/spools/`, spools)
                .then()
                .catch((err) => console.error(err));
        }
    };
    return (
        <Button
            color="secondary"
            variant="contained"
            startIcon={<SaveAltIcon />}
            onClick={handleSaveButton}
            disabled={!spools.length}
        >
            Įrašyti
        </Button>
    );
};

export default SaveButton;
