import React from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core";

import { API_URL } from "../../../utils/api";
import AddNewTypeDialog from "./AddNewTypeDialog";
import AddSpoolAutocomplete from "./AddSpoolAutocomplete";

const useStyles = makeStyles({
    addSpoolForm: {}
});

const AddSpoolForm = () => {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        plasticType: null,
        color: null,
        manufacturer: null,
        weight: null
    });
    const [isLoading, setIsLoading] = React.useState(true);
    const [data, setData] = React.useState(null);
    const [open, toggleOpen] = React.useState(false);
    const [dialogValue, setDialogValue] = React.useState({
        title: null
    });

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`${API_URL}/statistics/`);
            setData(result.data);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    const handleClose = () => {
        setDialogValue({
            title: ""
        });

        toggleOpen(false);
    };

    const handleSubmit = prop => event => {
        event.preventDefault();
        setValues({
            ...values,
            [prop]: dialogValue.title
        });
        axios
            .post(`${API_URL}/statistics/update/`, {
                [prop]: { title: dialogValue.title }
            })
            .catch(error => console.log(error));

        handleClose();
    };

    const handleChange = prop => (event, value) => {
        setValues({ ...values, [prop]: event });
    };

    return (
        <div>
            {!isLoading && (
                <div className={classes.addSpoolForm}>
                    <AddSpoolAutocomplete
                        values={values.manufacturer}
                        toggleOpen={toggleOpen}
                        setDialogValue={setDialogValue}
                        handleChange={handleChange("manufacturer")}
                        options={data.manufacturers}
                        textFieldLabel="Gamintojas"
                    />
                    <AddNewTypeDialog
                        open={open}
                        handleClose={handleClose}
                        handleSubmit={handleSubmit("manufacturer")}
                        dialogValue={dialogValue}
                        setDialogValue={setDialogValue}
                        dialogTitle="Pridėti naują gamintoją"
                        textFieldLabel="Gamintojas"
                    />
                </div>
            )}
        </div>
    );
};

export default AddSpoolForm;
