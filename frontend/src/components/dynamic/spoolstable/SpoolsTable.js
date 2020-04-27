import React from "react";
import axios from "axios";
import { API_URL } from "../../../utils/api";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";

import SpoolsTableHeader from "./SpoolsTableHeader";
import SpoolsTableToolbar from "./SpoolsTableToolbar";

function descendingComparator(a, b, orderBy) {
    if (orderBy === "index") {
        if (parseInt(b[orderBy]) < parseInt(a[orderBy])) {
            return -1;
        }
        if (parseInt(b[orderBy]) > parseInt(a[orderBy])) {
            return 1;
        }
        return 0;
    } else {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    if (array) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    } else {
        return [];
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: "70%",
        margin: "0 auto",
    },
    paper: {
        width: "100%",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: "rect(0 0 0 0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        top: 20,
        width: 1,
    },
}));

const EnhancedTable = () => {
    const classes = useStyles();
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("index");
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [filters, setFilters] = React.useState({
        manufacturers: [],
        plasticTypes: [],
        colors: [],
        weight: [0, 1000],
    });

    const [statistics, setStatistics] = React.useState([]);
    const [data, setData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            const getStatistics = () => axios.get(`${API_URL}/statistics/`);
            const getSpools = () => axios.get(`${API_URL}/spools/`);

            const [statistics, spools] = await Promise.all([
                getStatistics(),
                getSpools(),
            ]);

            setData(spools.data);
            setStatistics(statistics.data);

            setIsLoading(false);
        };
        fetchData();
    }, []);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = data.map((n) => n._id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, spool) => {
        const selectedIndex = selected.indexOf(spool._id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, spool._id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    const getDate = (date) => {
        return date.split("T")[0];
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredSpoolsById = data.filter((spool) => {
        return spool.index.includes(searchQuery);
    });

    const applyFilters = (spools) => {
        let filteredSpools = spools;
        const inRange = (x, min, max) => {
            return (x - min) * (x - max) <= 0;
        };

        if (filters.manufacturers.length) {
            filteredSpools = spools.filter((spool) =>
                filters.manufacturers.includes(spool.manufacturer)
            );
        }
        if (filters.plasticTypes.length) {
            filteredSpools = filteredSpools.filter((spool) =>
                filters.plasticTypes.includes(spool.plasticType)
            );
        }
        if (filters.colors.length) {
            filteredSpools = filteredSpools.filter((spool) =>
                filters.colors.includes(spool.color)
            );
        }
        if (filters.weight.length) {
            filteredSpools = filteredSpools.filter((spool) =>
                inRange(spool.weight, filters.weight[0], filters.weight[1])
            );
        }
        return filteredSpools;
    };

    const handleDeleteSpools = () => {
        console.log(selected);
    };

    return (
        <div className={classes.root}>
            {!isLoading && (
                <Paper className={classes.paper}>
                    <SpoolsTableToolbar
                        numSelected={selected.length}
                        searchQuery={searchQuery}
                        handleSearchChange={handleSearchChange}
                        statistics={statistics}
                        filters={filters}
                        setFilters={setFilters}
                        handleDeleteSpools={handleDeleteSpools}
                    />
                    <TableContainer>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            aria-label="enhanced table"
                        >
                            <SpoolsTableHeader
                                classes={classes}
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={data.length}
                                statistics={statistics}
                            />
                            <TableBody>
                                {stableSort(
                                    searchQuery
                                        ? applyFilters(filteredSpoolsById)
                                        : applyFilters(data),
                                    getComparator(order, orderBy)
                                )
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .map((row, index) => {
                                        const isItemSelected = isSelected(
                                            row._id
                                        );
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) =>
                                                    handleClick(event, row)
                                                }
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row._id}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            "aria-labelledby": labelId,
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="none"
                                                    align="center"
                                                >
                                                    {row.index}
                                                </TableCell>
                                                {[
                                                    row.manufacturer,
                                                    row.plasticType,
                                                    row.weight,
                                                    row.color,
                                                    getDate(row.dateOpened),
                                                ].map((tableCell) => (
                                                    <TableCell
                                                        align="center"
                                                        key={tableCell}
                                                    >
                                                        {tableCell}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: 53 * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        labelRowsPerPage="Ritės puslapyje"
                    />
                </Paper>
            )}
        </div>
    );
};

export default EnhancedTable;
