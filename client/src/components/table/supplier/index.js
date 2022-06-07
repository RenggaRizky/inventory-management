import React, { useState } from "react";
import styles from "./style.module.css";
import { Link } from "react-router-dom";

import { HiOutlinePencilAlt } from "react-icons/hi";

import BtnLinkSuccess from "../../button/link/success";
import ModalDelete from "../../button/modal/delete";
import { H6 } from "../../typography/heading";
import P from "../../typography/paragraph";

const TableSupplier = ({ tableheaddata, tablebodydata, setsupplier, ...props }) => {
    const [currentId, setCurrentId] = useState(null);
    return (
        <table className={`${styles.table} table`}>
            <thead className={styles.table_head}>
                <tr>
                    {tableheaddata.map((data) => {
                        return (
                            <th scope="col" key={data.key} className="text-uppercase" style={{ width: data.width }}>
                                <H6 color="#6B7280">{data.title}</H6>
                            </th>
                        );
                    })}
                </tr>
            </thead>
            <tbody className={styles.table_body}>
                {tablebodydata.map((data, index) => {
                    return (
                        <tr key={data._id} className="align-middle">
                            <td className="text-capitalize">
                                <P color="#616161">{index + 1}</P>
                            </td>
                            <td className="text-capitalize">
                                <P color="#616161">{data.nama}</P>
                            </td>
                            <td>
                                <P color="#616161">{data.kontak}</P>
                            </td>
                            <td className="text-capitalize">
                                <P color="#616161">{data.alamat}</P>
                            </td>
                            <td>
                                <div className="d-flex justify-content-end">
                                    <Link to={"edit-supplier"} state={{ id: data._id }} className="text-decoration-none d-flex align-items-center">
                                        <BtnLinkSuccess bs="text-uppercase d-flex border-0 align-items-center">
                                            <HiOutlinePencilAlt className={styles.icon_edit} />
                                            Edit
                                        </BtnLinkSuccess>
                                    </Link>
                                    <ModalDelete value="Hapus" page="Supplier" target="hapusSupplier" currentid={currentId} setcurrentid={() => setCurrentId(data._id)} setdata={setsupplier} deleteurl={"supplier"} />
                                </div>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default TableSupplier;
