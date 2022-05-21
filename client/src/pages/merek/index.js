import React, { useState, useEffect } from "react";
import { url } from "../../api";

import Search from "../../components/form/search";
import styles from "./style.module.css";

import Pagination from "../../components/pagination";
import Spinner from "../../components/spinner";
import MainCard from "../../components/card/main";
import HeadContent from "../../layouts/head-content";
import Divider from "../../components/divider";
import ModalMerek from "../../components/button/modal/modal-merek";
import TableMerek from "../../components/table/merek";

const Merek = () => {
    const [merek, setMerek] = useState(null);

    const getMerek = () => {
        url.get("merek")
            .then((response) => {
                setMerek(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    useEffect(() => {
        getMerek();
    }, []);

    const tableHead = [
        { key: 1, title: "NO", width: "10%" },
        { key: 2, title: "Merek Barang", width: "70%" },
        { key: 3, title: "", width: "20%" },
    ];

    return (
        <div className={styles.wrapper}>
            <MainCard>
                <HeadContent title="Merek" subtitle="Kumpulan data mengenai merek barang" />
                <Divider margin="0 0 24px 0" />
                <div className={`${styles.action_wrapper} d-flex justify-content-between`}>
                    <div className="w-50">
                        <Search placeholder="Cari Merek" />
                    </div>
                    <ModalMerek value="Tambah" type="add" target="tambahMerek" merek={merek} setmerek={setMerek} />
                </div>

                {merek === null ? <Spinner /> : <TableMerek tableheaddata={tableHead} tablebodydata={merek} setmerek={setMerek} />}
                {/* <div className="d-flex justify-content-end">
                    <Pagination />
                </div> */}
            </MainCard>
        </div>
    );
};

export default Merek;
