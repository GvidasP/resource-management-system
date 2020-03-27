import React from "react";

const Spool = ({ spool }) => {
    return (
        <ul className="spool__content">
            <li>
                <p className="spool__info">{spool._id}</p>
            </li>
            <li>
                <p className="spool__info">{spool.manufacturer}</p>
            </li>
            <li>
                <p className="spool__info">{spool.plasticType}</p>
            </li>
            <li>
                <p className="spool__info">{spool.weight}</p>
            </li>
            <li>
                <p className="spool__info">{spool.color}</p>
            </li>
            <li>
                <p className="spool__info">{spool.dateOpened.split("T")[0]}</p>
            </li>
        </ul>
    );
};

export default Spool;
