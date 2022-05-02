import React from "react";
import styles from "./style.module.css";

const Table = (props) => {
    const { table, table_head } = styles;
    const { tablehead, tabledata } = props;

    return (
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
                {/* <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td colSpan="2">Larry the Bird</td>
                    <td>@twitter</td>
                </tr> */}
                {tabledata.map((td) => {
                    return (
                        <tr key={td._id}>
                            <td>{td.nama}</td>
                            <td>button</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default Table;
