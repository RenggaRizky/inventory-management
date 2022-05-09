import React from "react";
import styles from "./style.module.css";
import ButtonAction from "../button/button-action";

const Table = (props) => {
    const { table, table_head } = styles;
    const { tablehead, tabledata } = props;

    return (
        <div className="table-responsive">
            <table className={`${table} table`}>
                <thead className={table_head}>
                    <tr>
                        {tablehead.map((th) => {
                            return (
                                <th scope="col" key={th.key}>
                                    {th.title}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {/* <ButtonAction type="update" tooltipTitle="perbarui data" />
                        <ButtonAction type="delete" tooltipTitle="hapus data" /> */}
                    <tr>
                        <td>{tabledata}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Table;
