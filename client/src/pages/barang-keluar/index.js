import moment from "moment";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { url } from "../../api";
import MainCard from "../../components/card/main";
import Divider from "../../components/divider";
import Search from "../../components/form/search";
import Spinner from "../../components/spinner";
import TableBarangKeluar from "../../components/table/barang-keluar";
import P from "../../components/typography/paragraph";
import HeadContent from "../../layouts/head-content";
import styles from "./style.module.css";

const BarangKeluar = () => {
    const [dataBarangKeluar, setDataBarangKeluar] = useState(null);

    const tableHead = [
        { key: 1, title: "Tanggal" },
        { key: 2, title: "Produk" },
        { key: 3, title: "Jumlah" },
    ];

    const getBarangKeluar = () => {
        url.get(`/barang-keluar`)
            .then((response) => {
                setDataBarangKeluar(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    useEffect(() => {
        getBarangKeluar();
    }, []);

    const [user, setUser] = useState(localStorage.getItem("profile") !== null ? JSON.parse(localStorage.getItem("profile")) : null);

    if (user === null) {
        return <Navigate to='/login' replace />;
    }

    return (
        <div className={styles.wrapper}>
            <MainCard>
                <HeadContent title='Barang Keluar' subtitle='Kumpulan data mengenai barang yang keluar'></HeadContent>
                <Divider margin='0 0 24px 0' />

                <>{dataBarangKeluar === null ? <Spinner /> : dataBarangKeluar.length === 0 ? <P>Tidak ada data yang ditampilkan</P> : <TableBarangKeluar tableheaddata={tableHead} tablebodydata={dataBarangKeluar} rowsperpage={10} />}</>
            </MainCard>
        </div>
    );
};

export default BarangKeluar;
