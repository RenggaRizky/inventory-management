import React, { useState, useEffect } from "react";
import { url } from "../../../api";

import TableSupplier from "../../../components/table/supplier";
import Spinner from "../../../components/spinner";

const TableDataSupplier = () => {
    const [supplier, setSupplier] = useState(null);

    const getSupplier = () => {
        url.get("supplier")
            .then((response) => {
                setSupplier(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    useEffect(() => {
        getSupplier();
    }, []);

    const tableHead = [
        { key: 1, title: "Supplier", width: "40%" },
        { key: 2, title: "No. Handphone", width: "15%" },
        { key: 3, title: "Alamat", width: "35%" },
        { key: 4, title: "", width: "10%" },
    ];

    return <div>{supplier === null ? <Spinner /> : <TableSupplier tableheaddata={tableHead} tablebodydata={supplier} setsupplier={setSupplier} />}</div>;
};

export default TableDataSupplier;
