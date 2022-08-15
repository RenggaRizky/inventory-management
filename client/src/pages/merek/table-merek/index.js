import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { url } from "../../../api";

import Spinner from "../../../components/spinner";
import TableMerek from "../../../components/table/merek";

const TableDataMerek = () => {
    const [user, setUser, merek, setMerek] = useOutletContext();

    const tableHead = [
        { key: 2, title: "Merek Barang" },
        { key: 3, title: "" },
    ];

    return <>{merek === null ? <Spinner /> : <TableMerek tableheaddata={tableHead} tablebodydata={merek} setmerek={setMerek} user={user} rowsperpage={10} />}</>;
};

export default TableDataMerek;
