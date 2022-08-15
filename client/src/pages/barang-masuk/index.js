import moment from "moment";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { url } from "../../api";
import MainCard from "../../components/card/main";
import Divider from "../../components/divider";
import Search from "../../components/form/search";
import Spinner from "../../components/spinner";
import TableBarangMasuk from "../../components/table/barang-masuk";
import { H6 } from "../../components/typography/heading";
import P from "../../components/typography/paragraph";
import Subtitle from "../../components/typography/subtitle";
import HeadContent from "../../layouts/head-content";
import styles from "./style.module.css";

const BarangMasuk = () => {
    const [dataBarangMasuk, setDataBarangMasuk] = useState(null);

    const tableHead = [
        { key: 1, title: "Tanggal" },
        { key: 2, title: "Produk" },
        { key: 3, title: "Jumlah" },
    ];

    const getBarangMasuk = () => {
        url.get(`/barang-masuk`)
            .then((response) => {
                setDataBarangMasuk(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    useEffect(() => {
        getBarangMasuk();
    }, []);

    const [user, setUser] = useState(localStorage.getItem("profile") !== null ? JSON.parse(localStorage.getItem("profile")) : null);

    if (user === null) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className={styles.wrapper}>
            <MainCard>
                <HeadContent title="Barang Masuk" subtitle="Kumpulan data mengenai barang yang masuk">
                    {/* <div className={`${styles.action_wrapper} d-flex justify-content-between align-items-center`}>
                        <div className="flex-grow-1 me-3">
                            <Search placeholder="Cari Barang" />
                        </div>
                    </div> */}
                </HeadContent>
                <Divider margin="0 0 24px 0" />

                <>{dataBarangMasuk === null ? <Spinner /> : dataBarangMasuk.length === 0 ? <P>Tidak ada data yang ditampilkan</P> : <TableBarangMasuk tableheaddata={tableHead} tablebodydata={dataBarangMasuk} rowsperpage={10} />}</>
            </MainCard>
        </div>
    );
};

export default BarangMasuk;
