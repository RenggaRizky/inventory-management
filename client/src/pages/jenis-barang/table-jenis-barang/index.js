import { useOutletContext } from "react-router-dom";
import Spinner from "../../../components/spinner";
import TableJenisBarang from "../../../components/table/jenis-barang";

const TableDataJenisBarang = () => {
    const [user, setUser, jenisBarang, setJenisBarang] = useOutletContext();

    const tableHead = [
        { key: 1, title: "Jenis Barang" },
        { key: 2, title: "" },
    ];
    return <>{jenisBarang === null ? <Spinner /> : <TableJenisBarang tableheaddata={tableHead} tablebodydata={jenisBarang} setjenisbarang={setJenisBarang} user={user} rowsperpage={10} />}</>;
};

export default TableDataJenisBarang;
