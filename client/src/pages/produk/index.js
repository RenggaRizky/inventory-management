import React, { useState, useEffect } from "react";
import { url } from "../../api";
import ModalProduk from "../../components/button/modal/modal-produk";
import MainCard from "../../components/card/main";
import Divider from "../../components/divider";
import Search from "../../components/form/search";
import Pagination from "../../components/pagination";
import Spinner from "../../components/spinner";
import TableProduk from "../../components/table/produk";
import HeadContent from "../../layouts/head-content";
import styles from "./style.module.css";

const Produk = () => {
    const [produk, setProduk] = useState(null);

    const getProduk = () => {
        url.get("produk")
            .then((response) => {
                setProduk(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    useEffect(() => {
        getProduk();
    }, []);

    const tableHead = [
        { key: 1, title: "NO", width: "5%" },
        { key: 2, title: "Produk", width: "30%" },
        { key: 3, title: "Jenis Barang", width: "8%" },
        { key: 4, title: "Merek", width: "8%" },
        { key: 5, title: "Harga Satuan (Rp)", width: "8%" },
        { key: 6, title: "Harga Perlusin (Rp)", width: "8%" },
        {
            key: 7,
            title: (
                <>
                    Volume (cm<sup>3</sup>)
                </>
            ),
            width: "13%",
        },
        { key: 8, title: "", width: "20%" },
    ];

    return (
        <div className={styles.wrapper}>
            <MainCard>
                <HeadContent title="Produk" subtitle="Kumpulan data mengenai produk yang tersedia" />
                <Divider margin="0 0 24px 0" />
                <div className={`${styles.action_wrapper} d-flex justify-content-between`}>
                    <div className="w-50">
                        <Search placeholder="Cari Produk" />
                    </div>
                    <ModalProduk value="Tambah" type="add" target="tambahProduk" produk={produk} setproduk={setProduk} />
                </div>

                {produk === null ? <Spinner /> : <TableProduk tableheaddata={tableHead} tablebodydata={produk} setproduk={setProduk} />}
                {/* <div className="d-flex justify-content-end">
                    <Pagination />
                </div> */}
            </MainCard>
        </div>
    );
};

export default Produk;
