import React, { useState, useEffect } from "react";
import { url } from "../../../api";
import Spinner from "../../../components/spinner";
import TableBarangRetur from "../../../components/table/barang-retur";
import P from "../../../components/typography/paragraph";

const TableDataBarangRetur = () => {
    const [barangRetur, setBarangRetur] = useState(null);

    const getBarangRetur = () => {
        url.get("barang-retur")
            .then((response) => {
                setBarangRetur(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    useEffect(() => {
        getBarangRetur();
    }, []);

    const tableHead = [
        { key: 1, title: "tanggal", width: "10%" },
        { key: 2, title: "produk", width: "20%" },
        { key: 3, title: "supplier", width: "20%" },
        { key: 4, title: "jumlah", width: "5%" },
        { key: 5, title: "unit", width: "5%" },
        { key: 6, title: "status", width: "10%" },
        { key: 7, title: "alasan", width: "20%" },
        { key: 9, title: "", width: "10%" },
    ];

    return <>{barangRetur === null ? <Spinner /> : barangRetur.length === 0 ? <P>Tidak ada data yang ditampilkan</P> : <TableBarangRetur tableheaddata={tableHead} tablebodydata={barangRetur} setbarangretur={setBarangRetur} />}</>;
};

export default TableDataBarangRetur;
