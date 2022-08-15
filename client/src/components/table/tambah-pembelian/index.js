import React, { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { url } from "../../../api";
import { BtnLinkDelete } from "../../button/link/error";
import { InputNumber } from "../../form/number";
import { InputSelect } from "../../form/select";
import styles from "./style.module.css";

const TambahBarisTablePembelian = ({ datapembelian, deleterows, handlechange, produk }) => {
    const [infoProduk, setInfoProduk] = useState(null);

    const getInfoProduk = (id) => {
        url.get(`/produk/${id}`)
            .then((response) => {
                setInfoProduk(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    return datapembelian.map((data, index) => {
        const { id_produk, jumlahMasuk, jumlahHarga } = data;
        return (
            <tr key={index} className="align-middle">
                <td>
                    {/* <input type="text" value={fullName} onChange={(evnt) => handleChange(index, evnt)} name="fullName" className="form-control" /> */}
                    <InputSelect data={produk} value={id_produk} onChange={(e) => handlechange(index, e)} name="id_produk" />
                </td>
                <td>
                    {/* <input type="text" value={emailAddress} onChange={(evnt) => handleChange(index, evnt)} name="emailAddress" className="form-control" />{" "} */}
                    <InputNumber value={jumlahMasuk} onChange={(e) => handlechange(index, e)} name="jumlahMasuk" />
                </td>
                <td>
                    {/* <input type="text" value={salary} onChange={(evnt) => handleChange(index, evnt)} name="salary" className="form-control" />{" "} */}
                    <InputNumber value={jumlahHarga} onChange={(e) => handlechange(index, e)} name="jumlahHarga" />
                </td>
                <td className="text-center">
                    {/* <button className="btn btn-outline-danger" onClick={() => deleteTableRows(index)}>
                        x
                    </button> */}
                    <BtnLinkDelete onClick={() => deleterows(index)}>
                        <HiOutlineTrash className={styles.icon_delete} />
                    </BtnLinkDelete>
                </td>
            </tr>
        );
    });
};

export default TambahBarisTablePembelian;
