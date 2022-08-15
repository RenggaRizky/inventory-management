import React, { useState } from "react";
import styles from "./style.module.css";
import { H6 } from "../../typography/heading";
import P from "../../typography/paragraph";
import moment from "moment";
import Subtitle from "../../typography/subtitle";
import useTable from "../../../hooks/useTable";
import TableFooter from "../footer";

const TableBarangMasuk = ({ tableheaddata, tablebodydata, rowsperpage, ...props }) => {
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(tablebodydata, page, rowsperpage);

    return (
        <>
            <div className="table-responsive">
                <table className={`${styles.table} table`} id="tableBarangMasuk">
                    <thead className={styles.table_head}>
                        <tr className="align-middle">
                            {tableheaddata.map((data) => {
                                return (
                                    <th scope="col" key={data.key} className="text-wrap text-uppercase">
                                        <H6 fontsize="0.75rem" color="#6B7280" fontweight="600">
                                            {data.title}
                                        </H6>
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody className={styles.table_body}>
                        {slice.map((x) => {
                            return (
                                <>
                                    {x.barangMasuk.map((y) => {
                                        return (
                                            <tr>
                                                <td className="text-capitalize text-nowrap">
                                                    <P color="#616161" fontsize="0.75rem">
                                                        {moment(y.tanggalMasuk).format("LL")}
                                                    </P>
                                                </td>
                                                <td className="d-flex align-items-center">
                                                    <img src={`data:image/png;base64, ${y.id_produk.gambar}`} alt={y.id_produk.nama} className={styles.product_picture} />
                                                    <div className="ms-3">
                                                        <H6 className="text-uppercase text-nowrap">{y.id_produk.nama}</H6>
                                                        <Subtitle
                                                            fontsize="0.75rem"
                                                            lineheight="15px"
                                                            bs="text-nowrap"
                                                        >{`Dimensi ${y.id_produk.dimensiProduk.panjang.$numberDecimal} x ${y.id_produk.dimensiProduk.lebar.$numberDecimal} x ${y.id_produk.dimensiProduk.tinggi.$numberDecimal}`}</Subtitle>
                                                    </div>
                                                </td>
                                                <td className="text-capitalize">
                                                    <P color="#616161" fontsize="0.75rem">
                                                        {y.jumlahMasuk}
                                                    </P>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
        </>
    );
};

export default TableBarangMasuk;
