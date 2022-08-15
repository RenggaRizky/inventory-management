import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { url } from "../../../api";
import Spinner from "../../../components/spinner";
import TableBarangRetur from "../../../components/table/barang-retur";
import P from "../../../components/typography/paragraph";

const TableDataBarangRetur = () => {
    const [user, setUser, responseErrorMessage, setResponseErrorMessage, barangRetur, setBarangRetur] = useOutletContext();

    const tableHead = [
        { key: 1, title: "tanggal" },
        { key: 2, title: "produk" },
        { key: 3, title: "supplier" },
        { key: 4, title: "jumlah" },
        { key: 6, title: "status" },
        { key: 7, title: "alasan" },
        { key: 9, title: "" },
    ];

    return (
        <>
            {barangRetur === null ? (
                <Spinner />
            ) : barangRetur.length === 0 ? (
                <P>Tidak ada data yang ditampilkan</P>
            ) : (
                <TableBarangRetur tableheaddata={tableHead} tablebodydata={barangRetur} setbarangretur={setBarangRetur} rowsperpage={10} />
            )}
        </>
    );
};

export default TableDataBarangRetur;
