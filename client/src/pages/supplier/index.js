import React, { useState, useEffect } from "react";
import { url } from "../../api";
import styles from "./style.module.css";

import MainCard from "../../components/card/main";
import HeadContent from "../../layouts/head-content";
import Divider from "../../components/divider";
import Search from "../../components/form/search";
import Spinner from "../../components/spinner";
import Pagination from "../../components/pagination";
import ModalSupplier from "../../components/button/modal/modal-supplier";
import TableSupplier from "../../components/table/supplier";

const Supplier = () => {
    const [supplier, setSupplier] = useState(null);

    const getSupplier = () => {
        url.get("supplier")
            .then((response) => {
                setSupplier(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    useEffect(() => {
        getSupplier();
    }, []);

    const tableHead = [
        { key: 1, title: "NO", width: "10%" },
        { key: 2, title: "Nama Supplier", width: "20%" },
        { key: 3, title: "Kontak", width: "15%" },
        { key: 4, title: "Alamat", width: "35%" },
        { key: 5, title: "", width: "20%" },
    ];

    return (
        <div className={styles.wrapper}>
            <MainCard>
                <HeadContent title="Supplier" subtitle="Kumpulan data mengenai supplier barang" />
                <Divider margin="0 0 24px 0" />
                <div className={`${styles.action_wrapper} d-flex justify-content-between`}>
                    <div className="w-50">
                        <Search placeholder="Cari Merek" />
                    </div>
                    <ModalSupplier value="Tambah" type="add" target="tambahSupplier" supplier={supplier} setsupplier={setSupplier} />
                </div>

                {supplier === null ? <Spinner /> : <TableSupplier tableheaddata={tableHead} tablebodydata={supplier} setsupplier={setSupplier} />}
                {/* <div className="d-flex justify-content-end">
                    <Pagination />
                </div> */}
            </MainCard>
        </div>
    );
};

export default Supplier;
