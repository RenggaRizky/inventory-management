import React from "react";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./style.module.css";

import { IoMdAdd } from "react-icons/io";
import { HiOutlinePencilAlt } from "react-icons/hi";

import BtnPrimary from "../../components/button/primary";
import MainCard from "../../components/card/main";
import Divider from "../../components/divider";
import Search from "../../components/form/search";
import HeadContent from "../../layouts/head-content";
import BtnLinkSuccess from "../../components/button/link/success";
import ModalDelete from "../../components/button/modal/delete-detail-section";

const Produk = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const pathname = location.pathname;

    return (
        <div className={styles.wrapper}>
            <MainCard>
                <HeadContent
                    title={pathname === "/produk" ? "Produk" : pathname === "/produk/tambah-produk" ? "Tambah Produk" : pathname === "/produk/edit-produk" ? "Edit Produk" : "Detail Produk"}
                    subtitle={
                        pathname === "/produk"
                            ? "Kumpulan data mengenai produk yang dijual"
                            : pathname === "/produk/tambah-produk"
                            ? "Menambah data produk yang dijual"
                            : pathname === "/produk/edit-produk"
                            ? "Memperbarui data produk yang dijual"
                            : "Detail informasi mengenai produk"
                    }
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

                    {pathname !== "/produk" && pathname !== "/produk/tambah-produk" && pathname !== "/produk/edit-produk" && (
                        <div className="d-flex justify-content-end align-items-center">
                            <Link to={"edit-produk"} state={{ id: id }} className="text-decoration-none d-flex align-items-center">
                                <BtnLinkSuccess bs="text-uppercase d-flex border-0 align-items-center">
                                    <HiOutlinePencilAlt className={styles.icon_edit} />
                                    Edit
                                </BtnLinkSuccess>
                            </Link>
                            <ModalDelete value="Hapus" page="Produk" target="hapusProduk" selectedid={id} selectedmenu="/produk" />
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
