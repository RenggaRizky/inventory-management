import React, { useState } from "react";
import styles from "./style.module.css";

import { H6 } from "../../typography/heading";
import P from "../../typography/paragraph";
import ModalJenisBarang from "../../button/modal/modal-jenisbarang";
import ModalDelete from "../../button/modal/delete";

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
                                <ModalJenisBarang value="Edit" type="edit" target="editJenisBarang" setcurrentid={() => setCurrentId(data._id)} currentid={currentId} />
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
