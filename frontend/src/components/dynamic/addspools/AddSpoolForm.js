import React from "react";
import axios from "axios";

import { makeStyles, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";

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
    },
    error: {
        marginTop: theme.spacing(2)
    }
}));

const AddSpoolForm = () => {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        plasticTypes: null,
        colors: null,
        manufacturers: null,
        weight: ""
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
    const [spools, setSpools] = React.useState([]);
    const [spoolsIndex, setSpoolsIndex] = React.useState(0);

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
                value={values.manufacturers}
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
                value={values.plasticTypes}
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
                value={values.colors}
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

    const handleWeightChange = event => {
        const input = event.target.value;
        if (!input || input.match(/^\d+(\.\d)?$/)) {
            setValues({ ...values, weight: input });
        }
    };

    const renderWeightForm = () => (
        <TextField
            id="weight-textfield"
            label="Svoris (g)"
            fullWidth
            onChange={handleWeightChange}
            className={classes.input}
            value={values && values.weight}
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

    const handleRemoveSpool = index => () => {
        setSpools(spools.filter(spool => spool.index !== index));
    };

    const handleFormSubmit = event => {
        const { manufacturers, plasticTypes, colors, weight } = values;

        event.preventDefault();
        if (!manufacturers || !plasticTypes || !colors || !weight) {
            setError("Būtina užpildyti visus laukelius!");
        } else {
            const spool = {
                index: spoolsIndex,
                manufacturer: values.manufacturers.title,
                plasticType: values.plasticTypes.title,
                color: values.colors.title,
                weight: values.weight
            };
            setSpools([...spools, spool]);
            setSpoolsIndex(spoolsIndex + 1);
            setValues({
                plasticTypes: null,
                colors: null,
                manufacturers: null,
                weight: ""
            });
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
            {console.log(spools)}
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
                    {error && (
                        <Typography color="error" className={classes.error}>
                            {error}
                        </Typography>
                    )}
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
                {spools &&
                    spools.map(spool => (
                        <AddSpoolCard
                            key={spools.indexOf(spool)}
                            spool={spool}
                            handleRemoveSpool={handleRemoveSpool}
                        />
                    ))}
            </div>
        </div>
    );
};

export default AddSpoolForm;
