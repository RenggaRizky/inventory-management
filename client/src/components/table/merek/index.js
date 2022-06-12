import React, { useState } from "react";
import styles from "./style.module.css";
import { Link } from "react-router-dom";

import { HiOutlinePencilAlt } from "react-icons/hi";

import { H6 } from "../../typography/heading";
import P from "../../typography/paragraph";

import BtnLinkSuccess from "../../button/link/success";
import ModalDeleteSecondary from "../../button/modal/delete-table-section";

const TableMerek = ({ tableheaddata, tablebodydata, setmerek, ...props }) => {
    const [currentId, setCurrentId] = useState(null);

    return (
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
                {tablebodydata.map((data) => {
                    return (
                        <tr key={data._id} className="align-middle">
                            <td className="text-capitalize">
                                <P color="#616161" fontsize="0.875rem">
                                    {data.nama}
                                </P>
                            </td>
                            <td>
                                <div className="d-flex justify-content-end">
                                    <Link to={"edit-merek"} state={{ id: data._id }} className="text-decoration-none d-flex align-items-center">
                                        <BtnLinkSuccess bs="text-uppercase d-flex border-0 align-items-center">
                                            <HiOutlinePencilAlt className={styles.icon_edit} />
                                            Edit
                                        </BtnLinkSuccess>
                                    </Link>
                                    <ModalDeleteSecondary value="Hapus" page="Merek" target="hapusMerek" currentid={currentId} setcurrentid={() => setCurrentId(data._id)} setdata={setmerek} deleteurl={"merek"} />
                                </div>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default TableMerek;
