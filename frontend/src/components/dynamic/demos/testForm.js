import React from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const TestForm = () => {
    const [value, setValue] = React.useState(null);

    const handleChange = event => {
        setValue(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        console.log(value);
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <TextField
                    id="weight-textfield"
                    label="Svoris (g)"
                    fullWidth
                    value={value}
                    onChange={handleChange}
                />
                <Button type="submit">Submit</Button>
            </form>
        </div>
    );
};

export default TestForm;
