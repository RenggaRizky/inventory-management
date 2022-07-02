import React from "react";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./style.module.css";

import { IoMdAdd } from "react-icons/io";
import { HiOutlinePencilAlt } from "react-icons/hi";

import MainCard from "../../components/card/main";
import Search from "../../components/form/search";
import BtnPrimary from "../../components/button/primary";
import HeadContent from "../../layouts/head-content";
import Divider from "../../components/divider";
import BtnLinkSuccess from "../../components/button/link/success";
import ModalDelete from "../../components/button/modal/delete-detail-section";

const Penjualan = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const pathname = location.pathname;
    return (
        <div className={styles.wrapper}>
            <MainCard>
                <HeadContent
                    title={pathname === "/penjualan" ? "Penjualan" : pathname === "/penjualan/tambah-penjualan" ? "Tambah Penjualan" : pathname === "/penjualan/edit-penjualan" ? "Edit Penjualan" : "Detail Penjualan"}
                    subtitle={
                        pathname === "/penjualan"
                            ? "Kumpulan data tentang penjualan barang"
                            : pathname === "/penjualan/tambah-penjualan"
                            ? "Menambah data penjualan barang"
                            : pathname === "/penjualan/edit-penjualan"
                            ? "Memperbarui data penjualan barang"
                            : "Detail informasi mengenai penjualan barang"
                    }
                >
                    {pathname === "/penjualan" && (
                        <div className={`${styles.action_wrapper} d-flex justify-content-between align-items-center`}>
                            <div className="flex-grow-1 me-3">
                                <Search placeholder="Cari Nomor Nota Penjualan" />
                            </div>
                            <BtnPrimary type="button" bs="align-self-stretch" onClick={() => navigate("tambah-penjualan")}>
                                <IoMdAdd className={styles.icon_add} />
                                Tambah Penjualan
                            </BtnPrimary>
                        </div>
                    )}

                    {pathname !== "/penjualan" && pathname !== "/penjualan/tambah-penjualan" && pathname !== "/penjualan/edit-penjualan" && (
                        <div className="d-flex justify-content-end align-items-center">
                            <Link to={"edit-penjualan"} state={{ id: id }} className="text-decoration-none d-flex align-items-center">
                                <BtnLinkSuccess bs="text-uppercase d-flex border-0 align-items-center">
                                    <HiOutlinePencilAlt className={styles.icon_edit} />
                                    Edit
                                </BtnLinkSuccess>
                            </Link>
                            <ModalDelete value="Hapus" page="Penjualan" target="hapusPenjualan" selectedid={id} selectedmenu="/penjualan" />
                        </div>
                    )}
                </HeadContent>
                <Divider margin="0 0 24px 0" />
                <Outlet />
            </MainCard>
        </div>
    );
};

export default Penjualan;
