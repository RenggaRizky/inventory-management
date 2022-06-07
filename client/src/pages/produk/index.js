import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./style.module.css";

import { IoMdAdd } from "react-icons/io";

import BtnPrimary from "../../components/button/primary";
import MainCard from "../../components/card/main";
import Divider from "../../components/divider";
import Search from "../../components/form/search";
import HeadContent from "../../layouts/head-content";

const Produk = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;
    const route = pathname.split("/");

    return (
        <div className={styles.wrapper}>
            <MainCard>
                <HeadContent
                    length={route.length}
                    item={pathname === "/produk" ? { first: "Produk" } : pathname === "/produk/tambah-produk" ? { first: "Produk", second: "Tambah Produk" } : { first: "Produk", second: "Edit Produk" }}
                    title={pathname === "/produk" ? "Produk" : pathname === "/produk/tambah-produk" ? "Tambah Produk" : "Edit Produk"}
                    subtitle={pathname === "/produk" ? "Kumpulan data mengenai produk yang tersedia" : pathname === "/produk/tambah-produk" ? "Menambah data produk yang tersedia" : "Memperbarui data produk yang tersedia"}
                >
                    {pathname === "/produk" && (
                        <div className={`${styles.action_wrapper} d-flex justify-content-between align-items-center`}>
                            <div className="flex-grow-1 me-3">
                                <Search placeholder="Cari Produk" />
                            </div>
                            <BtnPrimary type="button" bs="align-self-stretch" onClick={() => navigate("tambah-produk")}>
                                <IoMdAdd className={styles.icon_add} />
                                Tambah Produk
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

export default Produk;
