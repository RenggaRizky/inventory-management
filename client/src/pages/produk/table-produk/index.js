import React, { useState, useEffect } from "react";
import { url } from "../../../api";
import Spinner from "../../../components/spinner";
import TableProduk from "../../../components/table/produk";

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
        { key: 1, title: "NO", width: "5%" },
        { key: 2, title: "Produk", width: "30%" },
        { key: 3, title: "Jenis Barang", width: "8%" },
        { key: 4, title: "Merek", width: "8%" },
        { key: 5, title: "Harga Satuan (Rp)", width: "8%" },
        { key: 6, title: "Harga Perlusin (Rp)", width: "8%" },
        {
            key: 7,
            title: (
                <>
                    Volume (cm<sup>3</sup>)
                </>
            ),
            width: "13%",
        },
        { key: 8, title: "", width: "20%" },
    ];
    return <>{produk === null ? <Spinner /> : <TableProduk tableheaddata={tableHead} tablebodydata={produk} setproduk={setProduk} />}</>;
};

export default TableDataProduk;
