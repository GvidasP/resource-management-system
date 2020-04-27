import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { lighten, makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import SearchIcon from "@material-ui/icons/Search";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import SpoolsTableSearchbar from "./SpoolsTableSearchbar";
import SpoolsTableFiltersDialog from "./spoolstablefilters/SpoolsTableFiltersDialog";

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
        display: "flex",
        justifyContent: "space-between",
    },
    highlight:
        theme.palette.type === "light"
            ? {
                  color: theme.palette.secondary.main,
                  backgroundColor: lighten(theme.palette.secondary.light, 0.85),
              }
            : {
                  color: theme.palette.text.primary,
                  backgroundColor: theme.palette.secondary.dark,
              },
    title: {
        flex: "1 2 100%",
    },
}));

const SpoolsTableToolbar = ({
    numSelected,
    searchQuery,
    handleSearchChange,
    statistics,
    filters,
    setFilters,
}) => {
    const classes = useToolbarStyles();
    const [searchVisibility, setSearchVisibility] = React.useState(false);
    const [filtersVisibility, setFiltersVisibility] = React.useState(false);

    const toggleSearch = () => {
        setSearchVisibility((prev) => !prev);
    };

    const toggleFilters = () => {
        setFiltersVisibility((prev) => !prev);
    };

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography
                    className={classes.title}
                    color="inherit"
                    variant="subtitle1"
                >
                    {numSelected} ritės pasirinktos
                </Typography>
            ) : (
                <Typography
                    className={classes.title}
                    variant="h6"
                    id="tableTitle"
                >
                    Ritės
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <React.Fragment>
                    <SpoolsTableSearchbar
                        searchVisibility={searchVisibility}
                        searchQuery={searchQuery}
                        handleSearchChange={handleSearchChange}
                    />
                    <SpoolsTableFiltersDialog
                        filtersVisibility={filtersVisibility}
                        toggleFilters={toggleFilters}
                        statistics={statistics}
                        filters={filters}
                        setFilters={setFilters}
                    />
                    <Tooltip title="Paieška">
                        <IconButton onClick={toggleSearch}>
                            <SearchIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Filtrai">
                        <IconButton
                            aria-label="filter list"
                            onClick={toggleFilters}
                        >
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                </React.Fragment>
            )}
        </Toolbar>
    );
};

SpoolsTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default SpoolsTableToolbar;
