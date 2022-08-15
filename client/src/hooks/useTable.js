import { useState, useEffect } from "react";

const calculateRange = (tablebodydata, rowsperpage) => {
    const range = [];
    const num = Math.ceil(tablebodydata.length / rowsperpage);
    let i = 1;
    for (let i = 1; i <= num; i++) {
        range.push(i);
    }
    return range;
};

const sliceData = (tablebodydata, page, rowsperpage) => {
    return tablebodydata.slice((page - 1) * rowsperpage, page * rowsperpage);
};

const useTable = (tablebodydata, page, rowsperpage) => {
    const [tableRange, setTableRange] = useState([]);
    const [slice, setSlice] = useState([]);

    useEffect(() => {
        const range = calculateRange(tablebodydata, rowsperpage);
        setTableRange([...range]);

        const slice = sliceData(tablebodydata, page, rowsperpage);
        setSlice([...slice]);
    }, [tablebodydata, setTableRange, page, setSlice]);

    return { slice, range: tableRange };
};

export default useTable;
