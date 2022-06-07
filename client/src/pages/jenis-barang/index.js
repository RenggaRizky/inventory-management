import React from "react";
import styles from "./style.module.css";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

import { IoMdAdd } from "react-icons/io";

import Search from "../../components/form/search";
import MainCard from "../../components/card/main";
import HeadContent from "../../layouts/head-content";
import Divider from "../../components/divider";
import BtnPrimary from "../../components/button/primary";

const JenisBarang = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;
    const route = pathname.split("/");

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
                        <div className={`${styles.action_wrapper} d-flex justify-content-between align-items-center`}>
                            <div className="flex-grow-1 me-3">
                                <Search placeholder="Cari Jenis Barang" />
                            </div>
                            <BtnPrimary type="button" bs="align-self-stretch" onClick={() => navigate("tambah-jenis-barang")}>
                                <IoMdAdd className={styles.icon_add} />
                                Tambah Jenis Barang
                            </BtnPrimary>
                        </div>
                    )}
                </HeadContent>
                <Divider margin="0 0 24px 0" />

                <Outlet />
            </MainCard>
        </div>
    );
};

export default JenisBarang;
