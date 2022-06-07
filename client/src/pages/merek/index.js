import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import styles from "./style.module.css";

import { IoMdAdd } from "react-icons/io";

import Search from "../../components/form/search";
import MainCard from "../../components/card/main";
import HeadContent from "../../layouts/head-content";
import Divider from "../../components/divider";
import BtnPrimary from "../../components/button/primary";

const Merek = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;
    const route = pathname.split("/");

    return (
        <div className={styles.wrapper}>
            <MainCard>
                <HeadContent
                    length={route.length}
                    item={pathname === "/merek" ? { first: "Merek" } : pathname === "/merek/tambah-merek" ? { first: "Merek", second: "Tambah Merek" } : { first: "Merek", second: "Edit Merek" }}
                    title={pathname === "/merek" ? "Merek" : pathname === "/merek/tambah-merek" ? "Tambah Merek" : "Edit Merek"}
                    subtitle={pathname === "/merek" ? "Kumpulan data mengenai merek barang" : pathname === "/merek/tambah-merek" ? "Menambah data merek barang" : "Memperbarui data merek barang"}
                >
                    {pathname === "/merek" && (
                        <div className={`${styles.action_wrapper} d-flex justify-content-between align-items-center`}>
                            <div className="flex-grow-1 me-3">
                                <Search placeholder="Cari Merek" />
                            </div>
                            <BtnPrimary type="button" bs="align-self-stretch" onClick={() => navigate("tambah-merek")}>
                                <IoMdAdd className={styles.icon_add} />
                                Tambah Merek
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

export default Merek;
