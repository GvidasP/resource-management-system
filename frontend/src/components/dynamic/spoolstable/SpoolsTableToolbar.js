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
}) => {
    const classes = useToolbarStyles();
    const [searchVisibility, setSearchVisibility] = React.useState(false);

    const toggleSearch = () => {
        setSearchVisibility((prev) => !prev);
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
            <SpoolsTableSearchbar
                searchVisibility={searchVisibility}
                searchQuery={searchQuery}
                handleSearchChange={handleSearchChange}
            />

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <>
                    <Tooltip title="Paieška">
                        <IconButton onClick={toggleSearch}>
                            <SearchIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Filtrai">
                        <IconButton aria-label="filter list">
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                </>
            )}
        </Toolbar>
    );
};

SpoolsTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default SpoolsTableToolbar;
