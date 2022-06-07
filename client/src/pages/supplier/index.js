import React from "react";
import styles from "./style.module.css";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

import { IoMdAdd } from "react-icons/io";

import MainCard from "../../components/card/main";
import HeadContent from "../../layouts/head-content";
import Divider from "../../components/divider";
import Search from "../../components/form/search";
import BtnPrimary from "../../components/button/primary";

const Supplier = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;
    const route = pathname.split("/");

    return (
        <div className={styles.wrapper}>
            <MainCard>
                <HeadContent
                    length={route.length}
                    item={pathname === "/supplier" ? { first: "Supplier" } : pathname === "/supplier/tambah-supplier" ? { first: "Supplier", second: "Tambah Supplier" } : { first: "Supplier", second: "Edit Supplier" }}
                    title={pathname === "/supplier" ? "Supplier" : pathname === "/supplier/tambah-supplier" ? "Tambah Supplier" : "Edit Supplier"}
                    subtitle={pathname === "/supplier" ? "Kumpulan data mengenai supplier barang" : pathname === "/supplier/tambah-supplier" ? "Menambah data supplier barang" : "Memperbarui data supplier barang"}
                >
                    {pathname === "/supplier" && (
                        <div className={`${styles.action_wrapper} d-flex justify-content-between align-items-center`}>
                            <div className="flex-grow-1 me-3">
                                <Search placeholder="Cari Supplier" />
                            </div>
                            <BtnPrimary type="button" bs="align-self-stretch" onClick={() => navigate("tambah-supplier")}>
                                <IoMdAdd className={styles.icon_add} />
                                Tambah Supplier
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

export default Supplier;
