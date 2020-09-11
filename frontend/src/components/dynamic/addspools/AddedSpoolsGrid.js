import React from "react";

import Grid from "@material-ui/core/Grid";
import AddSpoolPaper from "./AddSpoolPaper";

const AddedSpoolsGrid = ({ spools, handleRemoveSpool }) => {
    return (
        <Grid container spacing={3}>
            {spools &&
                spools.map((spool) => (
                    <Grid item key={spool.index}>
                        <AddSpoolPaper
                            spool={spool}
                            handleRemoveSpool={handleRemoveSpool}
                        />
                    </Grid>
                ))}
        </Grid>
    );
};

export default AddedSpoolsGrid;
