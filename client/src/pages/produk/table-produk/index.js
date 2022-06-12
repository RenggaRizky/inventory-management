import React, { useState, useEffect } from "react";
import { url } from "../../../api";
import Spinner from "../../../components/spinner";
import TableProduk from "../../../components/table/produk";
import P from "../../../components/typography/paragraph";

const TableDataProduk = () => {
    const [produk, setProduk] = useState(null);

    const getProduk = () => {
        url.get("produk")
            .then((response) => {
                setProduk(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    useEffect(() => {
        getProduk();
    }, []);

    const tableHead = [
        { key: 1, title: "Produk", width: "35%" },
        { key: 2, title: "Jenis Barang", width: "10%" },
        { key: 3, title: "Merek", width: "10%" },
        { key: 4, title: "Unit", width: "10%" },
        { key: 5, title: "Volume", width: "10%" },
        { key: 6, title: "Harga", width: "15%" },
        { key: 7, title: "", width: "10%" },
    ];

    return <>{produk === null ? <Spinner /> : produk.length === 0 ? <P>Tidak ada data yang ditampilkan</P> : <TableProduk tableheaddata={tableHead} tablebodydata={produk} setproduk={setProduk} />}</>;
};

export default TableDataProduk;
