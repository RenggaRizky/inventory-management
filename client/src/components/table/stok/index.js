import React, { useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import Spinner from "../../spinner";
import { H6 } from "../../typography/heading";
import P from "../../typography/paragraph";
import Subtitle from "../../typography/subtitle";
import styles from "./style.module.css";
import jsPDF from "jspdf";
import ReactDOMServer from "react-dom/server";
// import html2canvas from "html2pdf.js";
import { renderToString } from "react-dom/server";
import useTable from "../../../hooks/useTable";
import TableFooter from "../footer";
// import Pdf from "react-to-pdf";

const TableStok = ({ tableheaddata, tablebodydata, rowsperpage, ...props }) => {
    const numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const decimalNumber = (number) => {
        if (Number.isInteger(number)) {
            return parseFloat(number.toFixed(1).toString().replace(".", ","));
        } else {
            return number.toFixed(1).toString().replace(".", ",");
        }
    };

    const [page, setPage] = useState(1);
    const { slice, range } = useTable(tablebodydata, page, rowsperpage);

    return (
        <>
            {tablebodydata === null ? (
                <Spinner />
            ) : (
                <>
                    <div className="table-responsive">
                        <table className={`${styles.table} table`}>
                            <thead className={styles.table_head}>
                                <tr className="align-middle">
                                    {tableheaddata.map((data) => {
                                        return (
                                            <th scope="col" key={data.key} className="text-uppercase">
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
                                            <td className="d-flex align-items-center text-nowrap">
                                                <img src={`data:image/png;base64, ${data.gambar}`} alt={data.nama} className={styles.product_picture} />
                                                <div className="ms-3">
                                                    <H6 className="text-uppercase">{data.nama}</H6>
                                                    <Subtitle fontsize="0.75rem" lineheight="15px">{`Dimensi ${numberWithCommas(decimalNumber(Number(data.dimensiProduk.panjang.$numberDecimal)))} x ${numberWithCommas(
                                                        decimalNumber(Number(data.dimensiProduk.lebar.$numberDecimal))
                                                    )} x ${numberWithCommas(decimalNumber(Number(data.dimensiProduk.tinggi.$numberDecimal)))}`}</Subtitle>
                                                </div>
                                            </td>
                                            <td className="text-capitalize text-nowrap">
                                                <P color="#616161" fontsize="0.875rem">
                                                    {numberWithCommas(data.stok.total)}
                                                </P>
                                            </td>
                                            {/* <td className="text-capitalize text-nowrap">
                                            <P color="#616161" fontsize="0.875rem">
                                                {numberWithCommas(data.stok.batasMinimum)}
                                            </P>
                                        </td> */}
                                            <td className="text-capitalize text-nowrap">
                                                <P color="#616161" fontsize="0.875rem">
                                                    {data.id_rak[0].nama} {data.id_rak[0].susun.nama} - {data.id_rak[0].lokasi}
                                                </P>
                                            </td>
                                            <td className="text-capitalize text-nowrap">
                                                <P color="#616161" fontsize="0.875rem">
                                                    <span
                                                        className={
                                                            data.stok.status === "Tersedia"
                                                                ? styles.status_wrapper_accepted
                                                                : data.stok.status === "Habis" || data.stok.status === "Penuh"
                                                                ? styles.status_wrapper_rejected
                                                                : styles.status_wrapper_process
                                                        }
                                                    >
                                                        {data.stok.status}
                                                    </span>
                                                </P>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
                </>
            )}
        </>
    );
};

export default TableStok;
