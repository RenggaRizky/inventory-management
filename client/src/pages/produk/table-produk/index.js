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
        { key: 1, title: "Produk" },
        {
            key: 2,
            title: (
                <span>
                    Jenis
                    <br />
                    Barang
                </span>
            ),
        },
        { key: 3, title: "Merek" },
        {
            key: 4,
            title: (
                <span>
                    Satuan
                    <br />
                    Barang
                </span>
            ),
        },
        { key: 5, title: "Volume" },
        { key: 6, title: "Harga" },
        { key: 7, title: "" },
    ];

    return <>{produk === null ? <Spinner /> : produk.length === 0 ? <P>Tidak ada data yang ditampilkan</P> : <TableProduk tableheaddata={tableHead} tablebodydata={produk} setproduk={setProduk} />}</>;
};

export default TableDataProduk;
