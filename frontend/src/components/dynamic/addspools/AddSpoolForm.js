import React from "react";
import axios from "axios";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";

import { API_URL } from "../../../utils/api";

const useStyles = makeStyles({
    textField: {
        width: "18rem"
    }
});

const AddSpoolForm = () => {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        plasticType: "",
        color: "",
        manufacturer: {},
        weight: ""
    });
    const [isLoading, setIsLoading] = React.useState(true);
    const [data, setData] = React.useState({});

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`${API_URL}/statistics/`);
            setData(result.data);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    const handleChange = prop => (event, value) => {
        setValues({ ...values, [prop]: value });
    };

    return (
        <>
            {!isLoading && (
                <div>
                    <FormControl>
                        <Autocomplete
                            id="manufacturer"
                            className={classes.textField}
                            options={data.manufacturers}
                            getOptionLabel={option => option.title}
                            onChange={handleChange("manufacturer")}
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    label="Gamintojas"
                                    variant="standard"
                                />
                            )}
                        />
                    </FormControl>
                    <FormControl>
                        <Autocomplete
                            id="plasticType"
                            className={classes.textField}
                            options={data.plasticType}
                            getOptionLabel={option => option.title}
                            onChange={handleChange("plasticType")}
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    label="Plastiko tipas"
                                    variant="standard"
                                />
                            )}
                        />
                    </FormControl>
                </div>
            )}
        </>
    );
};

export default AddSpoolForm;
