import React from "react";

import TextField from "@material-ui/core/TextField";
import Collapse from "@material-ui/core/Collapse";

const SpoolsTableSearchbar = ({
    searchVisibility,
    searchQuery,
    handleSearchChange,
}) => {
    return (
        <Collapse in={searchVisibility}>
            <TextField
                label="Paieška (pagal id)"
                value={searchQuery}
                onChange={handleSearchChange}
                type="number"
            />
        </Collapse>
    );
};

export default SpoolsTableSearchbar;
