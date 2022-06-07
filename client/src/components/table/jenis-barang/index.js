import React, { useState } from "react";
import styles from "./style.module.css";

import { HiOutlinePencilAlt } from "react-icons/hi";

import { H6 } from "../../typography/heading";
import P from "../../typography/paragraph";
import ModalDelete from "../../button/modal/delete";
import { Link } from "react-router-dom";
import BtnLinkSuccess from "../../button/link/success";

const TableJenisBarang = ({ tableheaddata, tablebodydata, setjenisbarang, ...props }) => {
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
                            <td className="d-flex justify-content-end">
                                <Link to="edit-jenis-barang" state={{ id: data._id }} className="text-decoration-none d-flex align-items-center">
                                    <BtnLinkSuccess bs="text-uppercase d-flex border-0 align-items-center">
                                        <HiOutlinePencilAlt className={styles.icon_edit} />
                                        Edit
                                    </BtnLinkSuccess>
                                </Link>
                                <ModalDelete value="Hapus" page="Jenis Barang" target="hapusJenisBarang" currentid={currentId} setcurrentid={() => setCurrentId(data._id)} setdata={setjenisbarang} deleteurl={"jenis-barang"} />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default TableJenisBarang;