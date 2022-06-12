import React from "react";
import styles from "./style.module.css";

import { H6 } from "../../typography/heading";
import P from "../../typography/paragraph";
import Subtitle from "../../typography/subtitle";
import { Link } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";

const TableProduk = ({ tableheaddata, tablebodydata, setproduk, ...props }) => {
    return (
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
                {tablebodydata.map((data) => {
                    return (
                        <tr key={data._id} className="align-middle">
                            <td className="d-flex align-items-center">
                                <img src={`data:image/png;base64, ${data.gambar}`} alt={data.nama} className={styles.product_picture} />
                                <div className="ms-3">
                                    <H6 className="text-uppercase">{data.nama}</H6>
                                    <Subtitle fontsize="0.75rem" lineheight="15px">{`Dimensi ${data.dimensi.panjang.$numberDecimal} x ${data.dimensi.lebar.$numberDecimal} x ${data.dimensi.tinggi.$numberDecimal}`}</Subtitle>
                                </div>
                            </td>
                            <td className="text-capitalize">
                                <P color="#616161" fontsize="0.875rem">
                                    {data.id_jenisbarang[0].nama}
                                </P>
                            </td>
                            <td className="text-capitalize">
                                <P color="#616161" fontsize="0.875rem">
                                    {data.id_merek[0].nama}
                                </P>
                            </td>
                            <td className="text-capitalize">
                                <P color="#616161" fontsize="0.875rem">
                                    {data.unit}
                                </P>
                            </td>
                            <td className="text-capitalize">
                                <P color="#616161" fontsize="0.875rem">
                                    {data.volume.$numberDecimal}
                                </P>
                            </td>
                            <td className="text-capitalize">
                                <P color="#616161" fontsize="0.875rem">
                                    {data.harga}
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

export default TableProduk;
