import React, { useState, useEffect } from "react";
import { url } from "../../../api";
import Spinner from "../../../components/spinner";
import TableSatuanBarang from "../../../components/table/satuan-barang";

const TableDataSatuanBarang = () => {
    const [satuanBarang, setSatuanBarang] = useState(null);

    const getSatuanBarang = () => {
        url.get("satuan-barang")
            .then((response) => {
                setSatuanBarang(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    useEffect(() => {
        getSatuanBarang();
    }, []);

    const tableHead = [
        { key: 1, title: "Satuan Barang" },
        { key: 2, title: "" },
    ];
    return <>{satuanBarang === null ? <Spinner /> : <TableSatuanBarang tableheaddata={tableHead} tablebodydata={satuanBarang} setsatuanbarang={setSatuanBarang} />}</>;
};

export default TableDataSatuanBarang;
