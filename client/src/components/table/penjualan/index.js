import React, { useState } from "react";
import styles from "./style.module.css";
import moment from "moment";
import "moment/locale/id";
import { H6 } from "../../typography/heading";
import P from "../../typography/paragraph";
import { Link } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import useTable from "../../../hooks/useTable";
import TableFooter from "../footer";

const TablePenjualan = ({ tableheaddata, tablebodydata, setpenjualan, rowsperpage, ...props }) => {
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(tablebodydata, page, rowsperpage);

    const numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };
    moment.locale("id");
    return (
        <>
            <div className="table-responsive">
                <table className={`${styles.table} table`}>
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
                        {slice.map((data) => {
                            return (
                                <tr key={data._id} className="align-middle">
                                    <td className="text-capitalize text-nowrap">
                                        <P color="#616161" fontsize="0.875rem">
                                            {moment(data.tanggalPenjualan).format("LL")}
                                        </P>
                                    </td>
                                    <td className="text-uppercase text-nowrap">
                                        <H6>{data.noNota}</H6>
                                    </td>
                                    <td>
                                        <P color="#616161" fontsize="0.875rem" className="text-nowrap">
                                            Rp {numberWithCommas(data.totalHarga)}
                                        </P>
                                    </td>
                                    <td className="text-center text-nowrap">
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

export default TablePenjualan;
