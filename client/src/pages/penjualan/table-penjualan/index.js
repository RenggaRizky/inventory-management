import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { url } from "../../../api";
import Spinner from "../../../components/spinner";
import TablePenjualan from "../../../components/table/penjualan";
import P from "../../../components/typography/paragraph";

const TableDataPenjualan = () => {
    const [user, setUser, responseErrorMessage, setResponseErrorMessage, penjualan, setPenjualan] = useOutletContext();

    const tableHead = [
        { key: 1, title: "Tanggal" },
        { key: 2, title: "No. Nota" },
        { key: 3, title: "Total Harga" },
        { key: 4, title: "" },
    ];

    return <>{penjualan === null ? <Spinner /> : penjualan.length === 0 ? <P>Tidak ada data yang ditampilkan</P> : <TablePenjualan tableheaddata={tableHead} tablebodydata={penjualan} setpenjualan={setPenjualan} rowsperpage={10} />}</>;
};

export default TableDataPenjualan;
