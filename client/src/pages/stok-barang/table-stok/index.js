import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { url } from "../../../api";
import Spinner from "../../../components/spinner";
import TableStok from "../../../components/table/stok";
import P from "../../../components/typography/paragraph";

const TabelDataStok = () => {
    const [user, setUser, stok, setStok] = useOutletContext();
    const tableHead = [
        { key: 1, title: "Produk" },
        { key: 2, title: "Stok" },
        // {
        //     key: 3,
        //     title: (
        //         <span>
        //             Batas
        //             <br />
        //             Minimum
        //         </span>
        //     ),
        // },
        { key: 3, title: "Rak" },
        { key: 4, title: "Status" },
    ];
    return <>{stok === null ? <Spinner /> : stok.length === 0 ? <P>Tidak ada data yang ditampilkan</P> : <TableStok tableheaddata={tableHead} tablebodydata={stok} rowsperpage={10} />}</>;
};

export default TabelDataStok;
