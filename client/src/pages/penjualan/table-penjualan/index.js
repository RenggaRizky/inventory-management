import React, { useEffect, useState } from "react";
import { url } from "../../../api";
import Spinner from "../../../components/spinner";
import TablePenjualan from "../../../components/table/penjualan";
import P from "../../../components/typography/paragraph";

const TableDataPenjualan = () => {
    const [penjualan, setPenjualan] = useState(null);

    const getPenjualan = () => {
        url.get("penjualan")
            .then((response) => {
                setPenjualan(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    useEffect(() => {
        getPenjualan();
    }, []);

    const tableHead = [
        { key: 1, title: "Tanggal" },
        { key: 2, title: "No. Nota" },
        { key: 3, title: "Total Harga" },
        { key: 4, title: "" },
    ];

    return <>{penjualan === null ? <Spinner /> : penjualan.length === 0 ? <P>Tidak ada data yang ditampilkan</P> : <TablePenjualan tableheaddata={tableHead} tablebodydata={penjualan} setpenjualan={setPenjualan} />}</>;
};

export default TableDataPenjualan;
