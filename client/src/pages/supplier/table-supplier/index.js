import TableSupplier from "../../../components/table/supplier";
import Spinner from "../../../components/spinner";
import { useOutletContext } from "react-router-dom";

const TableDataSupplier = () => {
    const [user, setUser, supplier, setSupplier] = useOutletContext();
    const tableHead = [
        { key: 1, title: "Supplier" },
        { key: 2, title: "No. Handphone" },
        { key: 3, title: "Alamat" },
        { key: 4, title: "" },
    ];

    return <div>{supplier === null ? <Spinner /> : <TableSupplier tableheaddata={tableHead} tablebodydata={supplier} setsupplier={setSupplier} rowsperpage={10} />}</div>;
};

export default TableDataSupplier;
