import React from "react";

import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

const AddButton = () => {
    return (
        <Button
            form="add-spool-form"
            color="primary"
            variant="contained"
            startIcon={<AddIcon />}
            type="submit"
        >
            Pridėti
        </Button>
    );
};

export default AddButton;
