import React from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core";
// import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";

import spoolsContext from "../../../state/spoolsContext";
import { API_URL } from "../../../utils/api";
import AddNewTypeDialog from "./AddSpoolDialog";
import AddSpoolAutocomplete from "./AddSpoolAutocomplete";
import AddedSpoolsGrid from "./AddedSpoolsGrid";
import AddSpoolWeightInput from "./AddSpoolWeightInput";
import ExportPdfButton from "./buttons/ExportPdfButton";
import ClearButton from "./buttons/ClearButton";
import SaveButton from "./buttons/SaveButton";
import AddButton from "./buttons/AddButton";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    addSpoolForm: {
        width: "55%",
        marginRight: theme.spacing(3),
    },
    inputs: {
        "& > *": {
            marginBottom: theme.spacing(2),
        },
    },
    error: {
        marginTop: theme.spacing(2),
    },
    buttons: {
        "& > *": {
            marginRight: theme.spacing(1),
        },
    },
    clearButton: {
        backgroundColor: "#e57373",
    },
}));

const AddSpoolForm = () => {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        manufacturers: { id: null, title: "" },
        plasticTypes: { id: null, title: "" },
        colors: { id: null, title: "" },
        weight: "",
    });
    const [isLoading, setIsLoading] = React.useState(true);
    const [data, setData] = React.useState({});
    const [open, toggleOpen] = React.useState({
        manufacturer: false,
        plasticType: false,
        color: false,
        weight: false,
    });
    const [dialogValue, setDialogValue] = React.useState("");
    const [error, setError] = React.useState("");
    const { spools, setSpools } = React.useContext(spoolsContext);
    const [spoolsIndex, setSpoolsIndex] = React.useState(0);

    React.useEffect(() => {
        const fetchData = async () => {
            const getStatistics = () => axios.get(`${API_URL}/statistics/`);
            const getSpoolsIndex = () =>
                axios.get(`${API_URL}/counters/spools/`);
            const [spoolIndex, statistics] = await Promise.all([
                getSpoolsIndex(),
                getStatistics(),
            ]);
            setData(statistics.data);
            setSpoolsIndex(spoolIndex.data.sequence_value);
            setIsLoading(false);
        };
        fetchData();
    }, [isLoading]);

    const handleSubmit = (prop) => (event) => {
        event.preventDefault();
        axios
            .post(`${API_URL}/statistics/`, {
                [prop]: { title: dialogValue },
            })
            .then((result) => {
                setIsLoading(true);
                const element = result.data[0][`${prop}`].find(
                    (item) => item.title === dialogValue
                );
                setValues((values) => ({
                    ...values,
                    [prop]: {
                        title: dialogValue,
                        id: element.id,
                    },
                }));
            })
            .catch((error) => console.log(error));
        handleClose();
    };

    const handleChange = (prop) => (event, value) => {
        setValues({ ...values, [prop]: event });
    };

    const handleOpen = (prop) => (value) => {
        toggleOpen({ ...open, [prop]: value });
    };

    const handleClose = () => {
        setDialogValue({
            title: "",
        });

        Object.keys(open).forEach((obj) => (open[obj] = false));
    };

    const newTypeDialogs = [
        {
            id: "manufacturer-dialog",
            open: open.manufacturer,
            handleClose: handleClose,
            handleSubmit: handleSubmit("manufacturers"),
            dialogValue: dialogValue,
            setDialogValue: setDialogValue,
            dialogTitle: "Pridėti naują gamintoją",
            textFieldLabel: "Gamintojas",
        },
        {
            id: "plasticType-dialog",
            open: open.plasticType,
            handleClose: handleClose,
            handleSubmit: handleSubmit("plasticTypes"),
            dialogValue: dialogValue,
            setDialogValue: setDialogValue,
            dialogTitle: "Pridėti naują plastiko tipą",
            textFieldLabel: "Plastiko tipas",
        },
        {
            id: "color-dialog",
            open: open.color,
            handleClose: handleClose,
            handleSubmit: handleSubmit("colors"),
            dialogValue: dialogValue,
            setDialogValue: setDialogValue,
            dialogTitle: "Pridėti naują spalvą",
            textFieldLabel: "Spalva",
        },
    ];

    const autocompleteInputs = [
        {
            id: "manufacturer-autocomplete",
            value: values.manufacturers,
            toggleOpen: handleOpen("manufacturer"),
            setDialogValue: setDialogValue,
            handleChange: handleChange("manufacturers"),
            options: data.manufacturers,
            textFieldLabel: "Gamintojas",
        },
        {
            id: "plasticType-autocomplete",
            value: values.plasticTypes,
            toggleOpen: handleOpen("plasticType"),
            setDialogValue: setDialogValue,
            handleChange: handleChange("plasticTypes"),
            options: data.plasticTypes,
            textFieldLabel: "Plastiko tipas",
        },
        {
            id: "color-autocomplete",
            value: values.colors,
            toggleOpen: handleOpen("color"),
            setDialogValue: setDialogValue,
            handleChange: handleChange("colors"),
            options: data.colors,
            textFieldLabel: "Spalva",
        },
    ];

    const handleWeightChange = (event) => {
        const input = event.target.value;
        if (!input || input.match(/^\d+(\.\d)?$/)) {
            setValues({ ...values, weight: input });
        }
    };

    const handleRemoveSpool = (index) => () => {
        setSpools(spools.filter((spool) => spool.index !== index));
    };

    const handleFormSubmit = (event) => {
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
                weight: values.weight,
            };
            setSpools([...spools, spool]);
            setSpoolsIndex(spoolsIndex + 1);
            setValues({
                plasticTypes: { id: null, title: "" },
                colors: { id: null, title: "" },
                manufacturers: { id: null, title: "" },
                weight: "",
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
                        {autocompleteInputs.map((input) => (
                            <AddSpoolAutocomplete
                                id={input.id}
                                value={input.value}
                                toggleOpen={input.toggleOpen}
                                setDialogValue={input.setDialogValue}
                                handleChange={input.handleChange}
                                options={input.options}
                                textFieldLabel={input.textFieldLabel}
                                key={input.id}
                            />
                        ))}
                        <AddSpoolWeightInput
                            handleChange={handleWeightChange}
                            classes={classes.input}
                            values={values}
                        />
                    </div>
                    <div className={classes.buttons}>
                        <AddButton />
                        <SaveButton spools={spools} />
                        <ClearButton className={classes.clearButton} />
                        <ExportPdfButton spools={spools} />
                    </div>
                    {error && (
                        <Alert
                            variant="outlined"
                            severity="error"
                            className={classes.error}
                        >
                            {error}
                        </Alert>
                    )}
                </form>
            ) : (
                <CircularProgress />
            )}
            <div>
                {newTypeDialogs.map((dialog) => (
                    <AddNewTypeDialog
                        id={dialog.id}
                        open={dialog.open}
                        handleClose={dialog.handleClose}
                        handleSubmit={dialog.handleSubmit}
                        dialogValue={dialog.dialogValue}
                        setDialogValue={dialog.setDialogValue}
                        textFieldLabel={dialog.textFieldLabel}
                        dialogTitle={dialog.dialogTitle}
                        key={dialog.id}
                    />
                ))}
            </div>
            <AddedSpoolsGrid
                spools={spools}
                handleRemoveSpool={handleRemoveSpool}
            />
        </div>
    );
};

export default AddSpoolForm;
