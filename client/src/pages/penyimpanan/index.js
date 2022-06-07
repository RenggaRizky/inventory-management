import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import { useLocation } from "react-router-dom";

import { IoMdAdd } from "react-icons/io";

import MainCard from "../../components/card/main";
import HeadContent from "../../layouts/head-content";
import Divider from "../../components/divider";
import { H4 } from "../../components/typography/heading";
import BtnList from "../../components/button/list";
import BtnPrimary from "../../components/button/primary";
import { url } from "../../api";
import Spinner from "../../components/spinner";

const TempatPenyimpanan = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const route = pathname.split("/");

    // const data = [
    //     { nama: "rak a", lokasi: "toko", jenis: "rak" },
    //     { nama: "rak b", lokasi: "toko", jenis: "rak" },
    //     { nama: "rak c", lokasi: "gudang", jenis: "rak" },
    //     { nama: "rak d", lokasi: "gudang", jenis: "rak" },
    //     { nama: "ruang a", lokasi: "gudang", jenis: "ruang" },
    //     { nama: "ruang b", lokasi: "gudang", jenis: "ruang" },
    // ];

    const [tempatPenyimpanan, setTempatPenyimpanan] = useState(null);

    const getTempatPenyimpanan = () => {
        url.get("tempat-penyimpanan")
            .then((response) => {
                setTempatPenyimpanan(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    useEffect(() => {
        getTempatPenyimpanan();
    }, []);

    return (
        <div className={styles.wrapper}>
            <MainCard>
                <HeadContent length={route.length} item={{ first: "Tempat Penyimpanan" }} title="Tempat Penyimpanan" subtitle="Kumpulan tempat yang dapat dipakai untuk menyimpan barang" />
                <Divider margin="0 0 24px 0" />
                <div className="row">
                    <div className="col-7">test</div>
                    <div className="col">
                        <BtnPrimary type="button">test</BtnPrimary>
                        <div className={styles.list_wrapper}>
                            <H4 margin="0 0 32px 0">Daftar Tempat Penyimpanan</H4>
                            {tempatPenyimpanan === null ? <Spinner /> : <BtnList data={tempatPenyimpanan}></BtnList>}
                        </div>
                    </div>
                </div>
            </MainCard>
        </div>
    );
};

export default TempatPenyimpanan;
