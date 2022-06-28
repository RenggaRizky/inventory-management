import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import { H6 } from "../../typography/heading";
import P from "../../typography/paragraph";
import Subtitle from "../../typography/subtitle";
import styles from "./style.module.css";

const TableStok = ({ tableheaddata, tablebodydata, ...props }) => {
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

    return (
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
                {tablebodydata.map((data) => {
                    return (
                        <tr key={data._id} className="align-middle">
                            <td className="d-flex align-items-center text-nowrap">
                                <img src={`data:image/png;base64, ${data.gambar}`} alt={data.nama} className={styles.product_picture} />
                                <div className="ms-3">
                                    <H6 className="text-uppercase">{data.nama}</H6>
                                    <Subtitle fontsize="0.75rem" lineheight="15px">{`Dimensi ${numberWithCommas(decimalNumber(Number(data.dimensi.panjang.$numberDecimal)))} x ${numberWithCommas(
                                        decimalNumber(Number(data.dimensi.lebar.$numberDecimal))
                                    )} x ${numberWithCommas(decimalNumber(Number(data.dimensi.tinggi.$numberDecimal)))}`}</Subtitle>
                                </div>
                            </td>
                            <td className="text-capitalize text-nowrap">
                                <P color="#616161" fontsize="0.875rem">
                                    {numberWithCommas(data.stok.total)}
                                </P>
                            </td>
                            <td className="text-capitalize text-nowrap">
                                <P color="#616161" fontsize="0.875rem">
                                    {numberWithCommas(data.stok.batasMinimum)}
                                </P>
                            </td>
                            <td className="text-capitalize text-nowrap">
                                <P color="#616161" fontsize="0.875rem">
                                    {numberWithCommas(data.stok.jumlahMasuk)}
                                </P>
                            </td>
                            <td className="text-capitalize text-nowrap">
                                <P color="#616161" fontsize="0.875rem">
                                    {numberWithCommas(data.stok.jumlahKeluar)}
                                </P>
                            </td>
                            <td className="text-capitalize text-nowrap">
                                <P color="#616161" fontsize="0.875rem">
                                    {numberWithCommas(data.stok.jumlahRetur)}
                                </P>
                            </td>
                            <td className="text-capitalize text-nowrap">
                                <P color="#616161" fontsize="0.875rem">
                                    <span className={data.stok.statusStok === "Tersedia" ? styles.status_wrapper_accepted : data.stok.statusStok === "Habis" ? styles.status_wrapper_rejected : styles.status_wrapper_process}>
                                        {data.stok.statusStok}
                                    </span>
                                </P>
                            </td>
                            <td>
                                <td className="text-center">
                                    <Link to={data._id} state={{ id: data._id }}>
                                        <BsThreeDots />
                                    </Link>
                                </td>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default TableStok;
