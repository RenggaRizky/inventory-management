import React, { useState } from "react";
import ModalDelete from "../../button/modal/delete";
import ModalSupplier from "../../button/modal/modal-supplier";
import { H6 } from "../../typography/heading";
import P from "../../typography/paragraph";
import styles from "./style.module.css";

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
                            <td className="d-flex justify-content-end">
                                <ModalSupplier value="Edit" type="edit" target="editSupplier" setcurrentid={() => setCurrentId(data._id)} currentid={currentId} />
                                <ModalDelete value="Hapus" page="Supplier" target="hapusSupplier" currentid={currentId} setcurrentid={() => setCurrentId(data._id)} setdata={setsupplier} deleteurl={"supplier"} />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default TableSupplier;
