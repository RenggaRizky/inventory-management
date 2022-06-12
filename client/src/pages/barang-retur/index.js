import React from "react";
import styles from "./style.module.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { IoMdAdd } from "react-icons/io";

import HeadContent from "../../layouts/head-content";
import MainCard from "../../components/card/main";
import Search from "../../components/form/search";
import BtnPrimary from "../../components/button/primary";
import Divider from "../../components/divider";

const BarangRetur = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const pathname = location.pathname;

    return (
        <div className={styles.wrapper}>
            <MainCard>
                <HeadContent
                    title={
                        pathname === "/barang-retur" ? "Barang Retur" : pathname === "/barang-retur/tambah-barang-retur" ? "Tambah Barang Retur" : pathname === "/barang-retur/edit-barang-retur" ? "Edit Barang Retur" : "Detail Barang Retur"
                    }
                    subtitle={
                        pathname === "/barang-retur"
                            ? "Kumpulan informasi mengenai barang yang di retur"
                            : pathname === "/barang-retur/tambah-barang-retur"
                            ? "Menambah barang yang di retur"
                            : pathname === "/barang-retur/edit-barang-retur"
                            ? "Memperbarui barang yang di retur"
                            : "Detail informasi mengenai barang yang di retur"
                    }
                >
                    {pathname === "/barang-retur" && (
                        <div className={`${styles.action_wrapper} d-flex justify-content-between align-items-center`}>
                            <div className="flex-grow-1 me-3">
                                <Search placeholder="Cari Barang yang di Retur" />
                            </div>
                            <BtnPrimary type="button" bs="align-self-stretch" onClick={() => navigate("tambah-barang-retur")}>
                                <IoMdAdd className={styles.icon_add} />
                                Tambah Barang Retur
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

export default BarangRetur;
