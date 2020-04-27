import React from "react";

import Slider from "@material-ui/core/Slider";

const SpoolsTableFiltersWeightSlider = ({
    value,
    handleWeightChange,
    classes,
}) => {
    return (
        <Slider
            value={value}
            valueLabelDisplay="auto"
            aria-labelledby="weight-slider"
            onChange={handleWeightChange}
            max={1000}
            className={classes.slider}
        />
    );
};

export default SpoolsTableFiltersWeightSlider;
