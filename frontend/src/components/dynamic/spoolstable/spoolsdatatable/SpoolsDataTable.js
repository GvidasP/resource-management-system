import React from "react";
import axios from "axios";
import MUIDataTable from "mui-datatables";

import { makeStyles } from "@material-ui/core/styles";

import { API_URL } from "../../../../utils/api";

const columns = [
    { name: "index", label: "id" },
    { name: "manufacturer", label: "gamintojas" },
    { name: "plasticType", label: "plastiko tipas" },
    { name: "weight", label: "masė (g)" },
    { name: "color", label: "spalva" },
    { name: "dateOpened", label: "atidarymo data" },
];
const options = {
    filterType: "multiselect",
    responsive: "scroll",
};

const useStyles = makeStyles({
    root: {
        width: "70%",
        margin: "1rem auto",
    },
});

const SpoolsDataTable = () => {
    const [data, setData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const classes = useStyles();

    React.useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            axios
                .get(`${API_URL}/spools/`)
                .then((result) => {
                    setData(result.data);
                    setIsLoading(false);
                })
                .catch((err) => console.log(err));
        };
        fetchData();
    }, []);

    return (
        <React.Fragment>
            {!isLoading && (
                <MUIDataTable
                    title="Ritės"
                    columns={columns}
                    data={data}
                    options={options}
                    className={classes.root}
                    onRowsDelete={(rowsDeleted, data) =>
                        console.log(rowsDeleted, data)
                    }
                />
            )}
        </React.Fragment>
    );
};

export default SpoolsDataTable;
