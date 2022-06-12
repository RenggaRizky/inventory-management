import React, { useState, useEffect } from "react";
import { url } from "../../../api";
import Spinner from "../../../components/spinner";
import TableJenisBarang from "../../../components/table/jenis-barang";

const TableDataJenisBarang = () => {
    const [jenisBarang, setJenisBarang] = useState(null);

    const getJenisBarang = () => {
        url.get("jenis-barang")
            .then((response) => {
                setJenisBarang(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    useEffect(() => {
        getJenisBarang();
    }, []);

    const tableHead = [
        { key: 1, title: "Jenis Barang" },
        { key: 2, title: "" },
    ];
    return <>{jenisBarang === null ? <Spinner /> : <TableJenisBarang tableheaddata={tableHead} tablebodydata={jenisBarang} setjenisbarang={setJenisBarang} />}</>;
};

export default TableDataJenisBarang;
