import React, { useState, useEffect } from "react";
import axios from "axios";

import { API_URL } from "../../../utils/api";
import Spool from "./Spool";

const SpoolList = () => {
    const [data, setData] = useState([]);
    const [isloading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            const result = await axios.get(`${API_URL}/spools`);
            setData(result.data);

            setIsLoading(false);
        };

        fetchData();
    }, []);
    return (
        <div className="spool-list">
            <div className="container">
                {!isloading && (
                    <div className="spool-list__content">
                        <h2 className="spool-list__title">Ričių sąrašas</h2>
                        <ul className="spool-list__headers">
                            <li className="spool-list__header">
                                <p>id</p>
                            </li>
                            <li className="spool-list__header">
                                <p>gamintojas</p>
                            </li>
                            <li className="spool-list__header">
                                <p>plastiko tipas</p>
                            </li>
                            <li className="spool-list__header">
                                <p>svoris (g)</p>
                            </li>
                            <li className="spool-list__header">
                                <p>spalva</p>
                            </li>
                            <li className="spool-list__header">
                                <p>atidaryta</p>
                            </li>
                        </ul>
                        <ul className="spool-list__spools">
                            {data.map(spool => (
                                <li
                                    className="spool-list__spool"
                                    key={spool._id}
                                >
                                    <Spool spool={spool} />
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SpoolList;
