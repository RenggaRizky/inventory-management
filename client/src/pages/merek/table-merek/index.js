import React, { useState, useEffect } from "react";
import { url } from "../../../api";

import Spinner from "../../../components/spinner";
import TableMerek from "../../../components/table/merek";

const TableDataMerek = () => {
    const [merek, setMerek] = useState(null);

    const getMerek = () => {
        url.get("merek")
            .then((response) => {
                setMerek(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    useEffect(() => {
        getMerek();
    }, []);

    const tableHead = [
        { key: 2, title: "Merek Barang", width: "80%" },
        { key: 3, title: "", width: "20%" },
    ];

    return <>{merek === null ? <Spinner /> : <TableMerek tableheaddata={tableHead} tablebodydata={merek} setmerek={setMerek} />}</>;
};

export default TableDataMerek;
