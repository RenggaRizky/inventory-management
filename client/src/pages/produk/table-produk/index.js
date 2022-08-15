import { useOutletContext } from "react-router-dom";
import Spinner from "../../../components/spinner";
import TableProduk from "../../../components/table/produk";
import P from "../../../components/typography/paragraph";

const TableDataProduk = () => {
    const [user, setUser, produk, setProduk] = useOutletContext();
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
        { key: 4, title: "Volume" },
        { key: 5, title: "Harga" },
        { key: 6, title: "" },
    ];

    return <>{produk === null ? <Spinner /> : produk.length === 0 ? <P>Tidak ada data yang ditampilkan</P> : <TableProduk tableheaddata={tableHead} tablebodydata={produk} setproduk={setProduk} rowsperpage={10} />}</>;
};

export default TableDataProduk;
