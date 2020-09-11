import React from "react";

import spoolsContext from "../../../../state/spoolsContext";

import { Button } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";

const ClearButton = ({ className }) => {
    const { spools, setSpools } = React.useContext(spoolsContext);

    const handleClearButton = () => {
        setSpools([]);
    };

    return (
        <Button
            variant="contained"
            color="primary"
            startIcon={<ClearIcon />}
            className={className}
            onClick={handleClearButton}
            disabled={!spools.length}
        >
            Išvalyti
        </Button>
    );
};

export default ClearButton;
