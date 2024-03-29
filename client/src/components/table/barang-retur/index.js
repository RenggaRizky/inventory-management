import React, { useState } from "react";
import styles from "./style.module.css";
import moment from "moment";
import "moment/locale/id";
import { Link } from "react-router-dom";

import { BsThreeDots } from "react-icons/bs";

import { H6 } from "../../typography/heading";
import P from "../../typography/paragraph";
import Subtitle from "../../typography/subtitle";
import useTable from "../../../hooks/useTable";
import TableFooter from "../footer";

const TableBarangRetur = ({ tableheaddata, tablebodydata, setbarangretur, rowsperpage, ...props }) => {
    moment.locale("id");
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(tablebodydata, page, rowsperpage);
    return (
        <>
            <div className="table-responsive">
                <table className={`${styles.table} table`}>
                    <thead className={styles.table_head}>
                        <tr className="align-middle">
                            {tableheaddata.map((data) => {
                                return (
                                    <th scope="col" key={data.key} className="text-uppercase" style={{ width: data.width }}>
                                        <H6 fontsize="0.75rem" color="#6B7280" fontweight="600">
                                            {data.title}
                                        </H6>
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>

                    <tbody className={styles.table_body}>
                        {slice.map((data) => {
                            return (
                                <tr key={data._id} className="align-middle">
                                    <td className="text-capitalize  text-nowrap">
                                        <P color="#616161" fontsize="0.75rem">
                                            {moment(data.tanggalPengembalian).format("LL")}
                                        </P>
                                    </td>
                                    <td className="d-flex align-items-center">
                                        <img src={`data:image/png;base64, ${data.id_produk[0].gambar}`} alt={data.id_produk[0].nama} className={styles.product_picture} />
                                        <div className="ms-3">
                                            <H6 className={`${styles.text_ellipsis} text-uppercase text-nowrap`}>{data.id_produk[0].nama}</H6>
                                            <Subtitle
                                                fontsize="0.75rem"
                                                lineheight="15px"
                                                bs="text-nowrap"
                                            >{`Dimensi ${data.id_produk[0].dimensiProduk.panjang.$numberDecimal} x ${data.id_produk[0].dimensiProduk.lebar.$numberDecimal} x ${data.id_produk[0].dimensiProduk.tinggi.$numberDecimal}`}</Subtitle>
                                        </div>
                                    </td>
                                    <td>
                                        <H6 className="text-uppercase text-nowrap"> {data.id_supplier[0].nama}</H6>
                                        <Subtitle fontsize="0.75rem" lineheight="15px" bs="text-nowrap">
                                            {data.id_supplier[0].namaPerusahaan}
                                        </Subtitle>
                                    </td>
                                    <td className="text-capitalize">
                                        <P color="#616161" fontsize="0.75rem" className="text-nowrap">
                                            {data.jumlah}
                                        </P>
                                    </td>
                                    <td className="text-capitalize text-nowrap">
                                        <P color="#fff" fontsize="0.75rem">
                                            {/* <span className={data.status === "Diterima" ? styles.status_wrapper_accepted : data.status === "Ditolak" ? styles.status_wrapper_rejected : styles.status_wrapper_process}>{data.status}</span> */}
                                            {(data.status === "Diterima Ganti Barang" || data.status === "Diterima Ganti Uang") && <span className={styles.status_wrapper_accepted}>Diterima</span>}
                                            {data.status === "Ditolak" && <span className={styles.status_wrapper_rejected}>Ditolak</span>}
                                            {data.status === "Diproses" && <span className={styles.status_wrapper_process}>Diproses</span>}
                                            {data.status === "Belum Bisa Masuk Rak (Kapasitas rak sudah penuh)" && <span className={styles.status_wrapper_full}>Belum Bisa Masuk Rak</span>}
                                        </P>
                                    </td>
                                    <td className="text-capitalize">
                                        <P color="#616161" fontsize="0.75rem" className={styles.text_ellipsis}>
                                            {data.alasan}
                                        </P>
                                    </td>
                                    <td className="text-center">
                                        <Link to={data._id} state={{ id: data._id }}>
                                            <BsThreeDots />
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
        </>
    );
};

export default TableBarangRetur;
