import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { Link } from "react-router-dom";
import useTable from "../../../hooks/useTable";

import { H6 } from "../../typography/heading";
import P from "../../typography/paragraph";
import Subtitle from "../../typography/subtitle";
import { BsThreeDots } from "react-icons/bs";
import TableFooter from "../footer";

const TableSupplier = ({ tableheaddata, tablebodydata, setsupplier, rowsperpage, ...props }) => {
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(tablebodydata, page, rowsperpage);
    return (
        <>
            <div className="table-responsive">
                <table className={`${styles.table} table`}>
                    <thead className={styles.table_head}>
                        <tr>
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
                                    <td className="text-capitalize">
                                        <H6 color="#616161" className="text-uppercase text-nowrap">
                                            {data.nama}
                                        </H6>
                                        <Subtitle fontsize="0.75rem" lineheight="15px" bs="text-nowrap">
                                            {data.namaPerusahaan}
                                        </Subtitle>
                                    </td>
                                    <td>
                                        <P color="#616161" fontsize="0.875rem" className="text-nowrap">
                                            {data.noHandphone}
                                        </P>
                                    </td>
                                    <td className="text-capitalize">
                                        <P color="#616161" fontsize="0.875rem" className={styles.text_ellipsis}>
                                            {data.alamat}
                                        </P>
                                    </td>
                                    <td className="text-center">
                                        <Link to={data._id} state={{ id: data._id }}>
                                            <BsThreeDots style={{ color: "#111928" }} />
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

export default TableSupplier;
