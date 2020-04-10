import React from "react";
import axios from "axios";

import { Button } from "@material-ui/core";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import { makeStyles } from "@material-ui/core";
import { API_URL } from "../../../utils/api";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(1),
    },
}));

const ExportPdfButton = ({ spools }) => {
    const classes = useStyles();

    const handleExportPdf = () => {
        axios
            .post(`${API_URL}/spools/exportpdf`, spools, {
                responseType: "blob",
            })
            .then((result) => {
                const file = new Blob([result.data], {
                    type: "application/pdf",
                });
                const fileUrl = URL.createObjectURL(file);
                window.open(fileUrl);
            })
            .catch((err) => console.error(err));
    };

    return (
        <Button
            startIcon={<PictureAsPdfIcon />}
            className={classes.root}
            variant="outlined"
            disabled={!spools.length}
            onClick={handleExportPdf}
        >
            Eksportuoti PDF
        </Button>
    );
};

export default ExportPdfButton;
