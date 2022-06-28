import React from "react";
import styles from "./style.module.css";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

import { IoMdAdd } from "react-icons/io";

import Search from "../../components/form/search";
import MainCard from "../../components/card/main";
import HeadContent from "../../layouts/head-content";
import Divider from "../../components/divider";
import BtnPrimary from "../../components/button/primary";

const SatuanBarang = () => {
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
                        pathname === "/satuan-barang"
                            ? { first: "Satuan Barang" }
                            : pathname === "/satuan-barang/tambah-satuan-barang"
                            ? { first: "Satuan Barang", second: "Tambah Satuan Barang" }
                            : { first: "Satuan Barang", second: "Edit Satuan Barang" }
                    }
                    title={pathname === "/satuan-barang" ? "Satuan Barang" : pathname === "/satuan-barang/tambah-satuan-barang" ? "Tambah Satuan Barang" : "Edit Satuan Barang"}
                    subtitle={pathname === "/satuan-barang" ? "Kumpulan data mengenai satuan barang" : pathname === "/satuan-barang/tambah-satuan-barang" ? "Menambah data satuan barang" : "Memperbarui data satuan barang"}
                >
                    {pathname === "/satuan-barang" && (
                        <div className={`${styles.action_wrapper} d-flex justify-content-between align-items-center`}>
                            <div className="flex-grow-1 me-3">
                                <Search placeholder="Cari Satuan Barang" />
                            </div>
                            <BtnPrimary type="button" bs="align-self-stretch" onClick={() => navigate("tambah-satuan-barang")}>
                                <IoMdAdd className={styles.icon_add} />
                                Tambah Satuan Barang
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

export default SatuanBarang;
