import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { useNavigate, useLocation, Outlet, Navigate } from "react-router-dom";

import { IoMdAdd } from "react-icons/io";

import Search from "../../components/form/search";
import MainCard from "../../components/card/main";
import HeadContent from "../../layouts/head-content";
import Divider from "../../components/divider";
import BtnPrimary from "../../components/button/primary";
import { url } from "../../api";

const JenisBarang = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;
    const route = pathname.split("/");

    const [user, setUser] = useState(localStorage.getItem("profile") !== null ? JSON.parse(localStorage.getItem("profile")) : null);
    const [text, setText] = useState("");
    const [jenisBarang, setJenisBarang] = useState(null);

    const getPencarianSJenisBarang = () => {
        url.post("/jenis-barang/filter", { text })
            .then((response) => {
                setJenisBarang(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        getPencarianSJenisBarang();
    };

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
    }, [location]);

    if (user === null) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className={styles.wrapper}>
            <MainCard>
                <HeadContent
                    length={route.length}
                    item={
                        pathname === "/jenis-barang"
                            ? { first: "Jenis Barang" }
                            : pathname === "/jenis-barang/tambah-jenis-barang"
                            ? { first: "Jenis Barang", second: "Tambah Jenis Barang" }
                            : { first: "Jenis Barang", second: "Edit Jenis Barang" }
                    }
                    title={pathname === "/jenis-barang" ? "Jenis Barang" : pathname === "/jenis-barang/tambah-jenis-barang" ? "Tambah Jenis Barang" : "Edit Jenis Barang"}
                    subtitle={
                        pathname === "/jenis-barang"
                            ? "Kumpulan data mengenai jenis & kategori barang"
                            : pathname === "/jenis-barang/tambah-jenis-barang"
                            ? "Menambah data jenis & kategori barang"
                            : "Memperbarui data jenis & kategori barang"
                    }
                >
                    {pathname === "/jenis-barang" && (
                        <div className={styles.action_wrapper}>
                            <div className={`${styles.search_wrapper} flex-grow-1 me-xxl-3 my-xxl-0 me-xl-3 my-xl-0 me-lg-3 my-lg-0  me-md-0 my-md-3 my-3`}>
                                <Search placeholder="Cari Jenis Barang" value={text} onchange={(e) => setText(e.target.value)} onsubmit={handleSearch} />
                            </div>
                            {user.user.peran !== "Pemilik Toko" && (
                                <BtnPrimary type="button" bs="align-self-stretch" onClick={() => navigate("tambah-jenis-barang")}>
                                    <IoMdAdd className={styles.icon_add} />
                                    Tambah Jenis Barang
                                </BtnPrimary>
                            )}
                        </div>
                    )}
                </HeadContent>
                <Divider margin="0 0 24px 0" />

                <Outlet context={[user, setUser, jenisBarang, setJenisBarang]} />
            </MainCard>
        </div>
    );
};

export default JenisBarang;
