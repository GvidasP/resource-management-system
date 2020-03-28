import React from "react";
import axios from "axios";

import { makeStyles, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";

import { API_URL } from "../../../utils/api";
import AddNewTypeDialog from "./AddSpoolDialog";
import AddSpoolAutocomplete from "./AddSpoolAutocomplete";
import AddSpoolCard from "./AddSpoolCard";

const useStyles = makeStyles(theme => ({
    addSpoolForm: {
        width: "55%",
        marginRight: theme.spacing(3)
    },
    input: {
        marginBottom: theme.spacing(2)
    }
}));

const AddSpoolForm = () => {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        plasticTypes: null,
        colors: null,
        manufacturers: null,
        weight: null
    });
    const [isLoading, setIsLoading] = React.useState(true);
    const [data, setData] = React.useState(null);
    const [open, toggleOpen] = React.useState({
        manufacturer: false,
        plasticType: false,
        color: false,
        weight: false
    });
    const [dialogValue, setDialogValue] = React.useState({
        title: null
    });

    const [error, setError] = React.useState("");

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`${API_URL}/statistics/`);
            setData(result.data);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    const handleSubmit = prop => event => {
        event.preventDefault();
        axios
            .post(`${API_URL}/statistics/update/`, {
                [prop]: { title: dialogValue.title }
            })
            .then(() => {
                data[`${prop}`].push({ title: dialogValue.title });
                setValues({
                    ...values,
                    [prop]: dialogValue.title
                });
            })
            .catch(error => console.log(error));
        handleClose();
    };

    const handleChange = prop => (event, value) => {
        setValues({ ...values, [prop]: event });
    };

    const handleOpen = prop => value => {
        toggleOpen({ ...open, [prop]: value });
    };

    const handleClose = () => {
        setDialogValue({
            title: ""
        });

        Object.keys(open).forEach(obj => (open[obj] = false));
    };

    const renderManufacturerForm = () => (
        <div className={classes.input}>
            <AddSpoolAutocomplete
                id="manufacturer-autocomplete"
                values={values.manufacturers}
                toggleOpen={handleOpen("manufacturer")}
                setDialogValue={setDialogValue}
                handleChange={handleChange("manufacturers")}
                options={data.manufacturers}
                textFieldLabel="Gamintojas"
            />
            <AddNewTypeDialog
                open={open.manufacturer}
                handleClose={handleClose}
                handleSubmit={handleSubmit("manufacturers")}
                dialogValue={dialogValue}
                setDialogValue={setDialogValue}
                dialogTitle="Pridėti naują gamintoją"
                textFieldLabel="Gamintojas"
            />
        </div>
    );

    const renderPlasticTypeForm = () => (
        <div className={classes.input}>
            <AddSpoolAutocomplete
                id="plasticType-autocomplete"
                values={values.plasticTypes}
                toggleOpen={handleOpen("plasticType")}
                setDialogValue={setDialogValue}
                handleChange={handleChange("plasticTypes")}
                options={data.plasticTypes}
                textFieldLabel="Plastiko tipas"
            />
            <AddNewTypeDialog
                open={open.plasticType}
                handleClose={handleClose}
                handleSubmit={handleSubmit("plasticTypes")}
                dialogValue={dialogValue}
                setDialogValue={setDialogValue}
                dialogTitle="Pridėti naują plastiko tipą"
                textFieldLabel="Plastiko tipas"
            />
        </div>
    );

    const renderColorForm = () => (
        <div className={classes.input}>
            <AddSpoolAutocomplete
                id="color-autocomplete"
                values={values.colors}
                toggleOpen={handleOpen("color")}
                setDialogValue={setDialogValue}
                handleChange={handleChange("colors")}
                options={data.colors}
                textFieldLabel="Spalva"
            />
            <AddNewTypeDialog
                open={open.color}
                handleClose={handleClose}
                handleSubmit={handleSubmit("colors")}
                dialogValue={dialogValue}
                setDialogValue={setDialogValue}
                dialogTitle="Pridėti naują spalvą"
                textFieldLabel="Spalva"
            />
        </div>
    );

    const renderWeightForm = () => (
        <TextField
            id="weight-textfield"
            label="Svoris (g)"
            fullWidth
            onChange={handleChange("weight")}
            className={classes.input}
        />
    );

    const renderAddButton = () => (
        <Button
            color="primary"
            variant="contained"
            startIcon={<AddIcon />}
            type="submit"
        >
            Pridėti
        </Button>
    );

    const handleFormSubmit = event => {
        event.preventDefault();
        if (error) {
            console.log("error");
            console.log(values);
        } else {
            console.log(values);
        }
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
            }}
        >
            {!isLoading && (
                <form
                    className={classes.addSpoolForm}
                    autoComplete="off"
                    id="addSpoolForm"
                    onSubmit={handleFormSubmit}
                >
                    {renderManufacturerForm()}
                    {renderPlasticTypeForm()}
                    {renderColorForm()}
                    {renderWeightForm()}
                    {renderAddButton()}
                </form>
            )}
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "45%",
                    justifyContent: "space-between",
                    flexWrap: "wrap"
                }}
            >
                {/* <AddSpoolCard values={values} /> */}
            </div>
        </div>
    );
};

export default AddSpoolForm;
