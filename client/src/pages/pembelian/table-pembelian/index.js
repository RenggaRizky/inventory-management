import React, { useEffect, useState } from "react";
import { url } from "../../../api";
import Spinner from "../../../components/spinner";
import TablePembelian from "../../../components/table/pembelian";
import P from "../../../components/typography/paragraph";

const TableDataPembelian = () => {
    const [pembelian, setPembelian] = useState(null);

    const getPembelian = () => {
        url.get("pembelian")
            .then((response) => {
                setPembelian(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    useEffect(() => {
        getPembelian();
    }, []);

    const tableHead = [
        { key: 1, title: "Tanggal" },
        { key: 2, title: "No. Nota" },
        { key: 3, title: "Supplier" },
        { key: 4, title: "Total Harga" },
        { key: 5, title: "" },
    ];

    return <>{pembelian === null ? <Spinner /> : pembelian.length === 0 ? <P>Tidak ada data yang ditampilkan</P> : <TablePembelian tableheaddata={tableHead} tablebodydata={pembelian} setpembelian={setPembelian} />}</>;
};

export default TableDataPembelian;
