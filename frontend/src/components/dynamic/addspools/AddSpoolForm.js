import React from "react";
import axios from "axios";

import { makeStyles, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import CircularProgress from "@material-ui/core/CircularProgress";

import { API_URL } from "../../../utils/api";
import AddNewTypeDialog from "./AddSpoolDialog";
import AddSpoolAutocomplete from "./AddSpoolAutocomplete";
import AddSpoolCard from "./AddSpoolCard";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    addSpoolForm: {
        width: "55%",
        marginRight: theme.spacing(3)
    },
    inputs: {
        "& > *": {
            marginBottom: theme.spacing(2)
        }
    },
    error: {
        marginTop: theme.spacing(2)
    },
    buttons: {
        "& > *": {
            marginRight: theme.spacing(1)
        }
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
    const [data, setData] = React.useState({});
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
        // const statisticsRequest = axios.get(`${API_URL}/statistics/`);
        const fetchData = async () => {
            const result = await axios.get(`${API_URL}/statistics/`);
            setData(result.data);
            setIsLoading(false);
        };
        fetchData();
    }, [isLoading]);

    const handleSubmit = prop => event => {
        event.preventDefault();
        axios
            .post(`${API_URL}/statistics/update/`, {
                [prop]: { title: dialogValue.title }
            })
            .then(() => {
                // data[`${prop}`].push({ title: dialogValue.title });
                setIsLoading(true);
                setValues(values => ({
                    ...values,
                    [prop]: dialogValue.title
                }));
            })
            .catch(error => console.log(error));
        // setData(data => ({
        //     ...data,
        //     [prop]: [
        //         ...data.manufacturers,
        //         { id: spoolsIndex, title: dialogValue.title }
        //     ]
        // }));
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

    const renderNewManufacturerDialog = () => (
        <AddNewTypeDialog
            id="manufacturer-dialog"
            open={open.manufacturer}
            handleClose={handleClose}
            handleSubmit={handleSubmit("manufacturers")}
            dialogValue={dialogValue}
            setDialogValue={setDialogValue}
            dialogTitle="Pridėti naują gamintoją"
            textFieldLabel="Gamintojas"
        />
    );

    const renderNewPlasticTypeDialog = () => (
        <AddNewTypeDialog
            id="plasticType-dialog"
            open={open.plasticType}
            handleClose={handleClose}
            handleSubmit={handleSubmit("plasticTypes")}
            dialogValue={dialogValue}
            setDialogValue={setDialogValue}
            dialogTitle="Pridėti naują plastiko tipą"
            textFieldLabel="Plastiko tipas"
        />
    );

    const renderNewColorDialog = () => (
        <div className={classes.input}>
            <AddNewTypeDialog
                id="color-dialog"
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

    const renderManufacturerAutocomplete = () => (
        <AddSpoolAutocomplete
            id="manufacturer-autocomplete"
            value={values.manufacturers}
            toggleOpen={handleOpen("manufacturer")}
            setDialogValue={setDialogValue}
            handleChange={handleChange("manufacturers")}
            options={data.manufacturers}
            textFieldLabel="Gamintojas"
        />
    );

    const renderPlasticTypeAutocomplete = () => (
        <AddSpoolAutocomplete
            id="plasticType-autocomplete"
            value={values.plasticTypes}
            toggleOpen={handleOpen("plasticType")}
            setDialogValue={setDialogValue}
            handleChange={handleChange("plasticTypes")}
            options={data.plasticTypes}
            textFieldLabel="Plastiko tipas"
        />
    );

    const renderColorAutocomplete = () => (
        <AddSpoolAutocomplete
            id="color-autocomplete"
            value={values.colors}
            toggleOpen={handleOpen("color")}
            setDialogValue={setDialogValue}
            handleChange={handleChange("colors")}
            options={data.colors}
            textFieldLabel="Spalva"
        />
    );

    const renderAddedSpoolsGrid = () => (
        <Grid container spacing={3}>
            {spools &&
                spools.map(spool => (
                    <Grid item key={spool.index}>
                        <AddSpoolCard
                            spool={spool}
                            handleRemoveSpool={handleRemoveSpool}
                        />
                    </Grid>
                ))}
        </Grid>
    );

    const handleWeightChange = event => {
        const input = event.target.value;
        if (!input || input.match(/^\d+(\.\d)?$/)) {
            setValues({ ...values, weight: input });
        }
    };

    const renderWeightInput = () => (
        <TextField
            id="weight-textfield"
            label="Svoris (g)"
            fullWidth
            onChange={handleWeightChange}
            className={classes.input}
            value={values && values.weight}
        />
    );

    const handleRemoveSpool = index => () => {
        setSpools(spools.filter(spool => spool.index !== index));
    };

    const renderAddButton = () => (
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

    const renderSaveButton = () => (
        <Button
            color="secondary"
            variant="contained"
            startIcon={<SaveAltIcon />}
            onClick={handleSaveButton}
        >
            Išsaugoti
        </Button>
    );

    const handleSaveButton = () => {
        if (!error && spools.length) {
            axios.post(`${API_URL}/spools/`);
        } else {
            console.log("Issaugoti negalima");
        }
    };

    const handleFormSubmit = event => {
        const { manufacturers, plasticTypes, colors, weight } = values;

        event.preventDefault();
        if (!manufacturers || !plasticTypes || !colors || !weight) {
            setError("Būtina užpildyti visus laukelius!");
        } else {
            const index =
                values.manufacturers.id.toString().padStart(2, "0") +
                values.plasticTypes.id.toString().padStart(3, "0") +
                values.colors.id.toString().padStart(2, "0") +
                spoolsIndex.toString().padStart(4, "0");
            const spool = {
                index,
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
        <div className={classes.root}>
            {!isLoading ? (
                <form
                    id="add-spool-form"
                    onSubmit={handleFormSubmit}
                    className={classes.addSpoolForm}
                    autoComplete="off"
                >
                    <div className={classes.inputs}>
                        {renderManufacturerAutocomplete()}
                        {renderPlasticTypeAutocomplete()}
                        {renderColorAutocomplete()}
                        {renderWeightInput()}
                    </div>
                    <div className={classes.buttons}>
                        {renderAddButton()}
                        {renderSaveButton()}
                    </div>
                    {error && (
                        <Typography color="error" className={classes.error}>
                            {error}
                        </Typography>
                    )}
                </form>
            ) : (
                <CircularProgress />
            )}
            <div>
                {renderNewManufacturerDialog()}
                {renderNewPlasticTypeDialog()}
                {renderNewColorDialog()}
            </div>
            {renderAddedSpoolsGrid()}
        </div>
    );
};

export default AddSpoolForm;
