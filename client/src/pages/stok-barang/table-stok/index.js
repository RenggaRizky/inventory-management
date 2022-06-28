import React, { useEffect, useState } from "react";
import { url } from "../../../api";
import Spinner from "../../../components/spinner";
import TableStok from "../../../components/table/stok";
import P from "../../../components/typography/paragraph";

const TabelDataStok = () => {
    const [stok, setStok] = useState(null);

    const getStok = () => {
        url.get("stok-barang")
            .then((response) => {
                setStok(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    useEffect(() => {
        getStok();
    }, []);

    const tableHead = [
        { key: 1, title: "Produk" },
        { key: 2, title: "Stok" },
        {
            key: 3,
            title: (
                <span>
                    Batas
                    <br />
                    Minimum
                </span>
            ),
        },
        {
            key: 4,
            title: (
                <span>
                    Jumlah
                    <br />
                    Masuk
                </span>
            ),
        },
        {
            key: 5,
            title: (
                <span>
                    Jumlah
                    <br />
                    Keluar
                </span>
            ),
        },
        {
            key: 6,
            title: (
                <span>
                    Jumlah
                    <br />
                    Retur
                </span>
            ),
        },
        { key: 7, title: "Status" },
        { key: 8, title: "" },
    ];
    return <>{stok === null ? <Spinner /> : stok.length === 0 ? <P>Tidak ada data yang ditampilkan</P> : <TableStok tableheaddata={tableHead} tablebodydata={stok} />}</>;
};

export default TabelDataStok;
