import React, { useState } from "react";
import styles from "./style.module.css";

import { HiOutlinePencilAlt } from "react-icons/hi";

import { H6 } from "../../typography/heading";
import P from "../../typography/paragraph";

import { Link } from "react-router-dom";
import BtnLinkSuccess from "../../button/link/success";
import ModalDeleteSecondary from "../../button/modal/delete-table-section";
import TableFooter from "../footer";
import useTable from "../../../hooks/useTable";

const TableJenisBarang = ({ tableheaddata, tablebodydata, setjenisbarang, rowsperpage, user, ...props }) => {
    const [currentId, setCurrentId] = useState(null);
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
                                    <td className="text-capitalize">
                                        <P color="#616161" fontsize="0.875rem">
                                            {data.nama}
                                        </P>
                                    </td>
                                    <td>
                                        {user.user.peran !== "Pemilik Toko" && (
                                            <div className="d-flex justify-content-end">
                                                <Link to="edit-jenis-barang" state={{ id: data._id }} className="text-decoration-none d-flex align-items-center">
                                                    <BtnLinkSuccess bs="text-uppercase d-flex border-0 align-items-center">
                                                        <HiOutlinePencilAlt className={styles.icon_edit} />
                                                        Edit
                                                    </BtnLinkSuccess>
                                                </Link>
                                                <ModalDeleteSecondary
                                                    value="Hapus"
                                                    page="Jenis Barang"
                                                    target="hapusJenisBarang"
                                                    currentid={currentId}
                                                    setcurrentid={() => setCurrentId(data._id)}
                                                    setdata={setjenisbarang}
                                                    deleteurl={"jenis-barang"}
                                                />
                                            </div>
                                        )}
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

export default TableJenisBarang;
