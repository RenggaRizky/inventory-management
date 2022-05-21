import React, { useState, useEffect } from "react";
import { url } from "../../api";
import styles from "./style.module.css";

import Search from "../../components/form/search";
import Spinner from "../../components/spinner";
import Pagination from "../../components/pagination";
import MainCard from "../../components/card/main";
import HeadContent from "../../layouts/head-content";
import Divider from "../../components/divider";
import ModalJenisBarang from "../../components/button/modal/modal-jenisbarang";
import TableJenisBarang from "../../components/table/jenis-barang";

const JenisBarang = () => {
    const [jenisBarang, setJenisBarang] = useState(null);

    const getJenisBarang = () => {
        url.get("jenis-barang")
            .then((response) => {
                setJenisBarang(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    useEffect(() => {
        getJenisBarang();
    }, []);

    const tableHead = [
        { key: 1, title: "NO" },
        { key: 2, title: "Jenis Barang" },
        { key: 3, title: "" },
    ];

    return (
        <div className={styles.wrapper}>
            <MainCard>
                <HeadContent title="Jenis Barang" subtitle="Kumpulan data mengenai jenis - jenis dan kategori barang" />
                <Divider margin="0 0 24px 0" />
                <div className={`${styles.action_wrapper} d-flex justify-content-between`}>
                    <div className="w-50">
                        <Search placeholder="Cari Jenis Barang" />
                    </div>
                    <ModalJenisBarang value="Tambah" type="add" target="tambahJenisBarang" jenisbarang={jenisBarang} setjenisbarang={setJenisBarang} />
                </div>

                {jenisBarang === null ? <Spinner /> : <TableJenisBarang tableheaddata={tableHead} tablebodydata={jenisBarang} setjenisbarang={setJenisBarang} />}
                {/* <div className="d-flex justify-content-end">
                    <Pagination />
                </div> */}
            </MainCard>
        </div>
    );
};

export default JenisBarang;
