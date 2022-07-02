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

const Pembelian = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const pathname = location.pathname;
    return (
        <div className={styles.wrapper}>
            <MainCard>
                <HeadContent
                    title={pathname === "/pembelian" ? "Pembelian" : pathname === "/pembelian/tambah-pembelian" ? "Tambah Pembelian" : pathname === "/pembelian/edit-pembelian" ? "Edit Pembelian" : "Detail Pembelian"}
                    subtitle={
                        pathname === "/pembelian"
                            ? "Kumpulan data tentang pembelian barang"
                            : pathname === "/pembelian/tambah-pembelian"
                            ? "Menambah data pembelian barang"
                            : pathname === "/pembelian/edit-pembelian"
                            ? "Memperbarui data pembelian barang"
                            : "Detail informasi mengenai pembelian barang"
                    }
                >
                    {pathname === "/pembelian" && (
                        <div className={`${styles.action_wrapper} d-flex justify-content-between align-items-center`}>
                            <div className="flex-grow-1 me-3">
                                <Search placeholder="Cari Nomor Nota Pembelian" />
                            </div>
                            <BtnPrimary type="button" bs="align-self-stretch" onClick={() => navigate("tambah-pembelian")}>
                                <IoMdAdd className={styles.icon_add} />
                                Tambah Pembelian
                            </BtnPrimary>
                        </div>
                    )}

                    {pathname !== "/pembelian" && pathname !== "/pembelian/tambah-pembelian" && pathname !== "/pembelian/edit-pembelian" && (
                        <div className="d-flex justify-content-end align-items-center">
                            <Link to={"edit-pembelian"} state={{ id: id }} className="text-decoration-none d-flex align-items-center">
                                <BtnLinkSuccess bs="text-uppercase d-flex border-0 align-items-center">
                                    <HiOutlinePencilAlt className={styles.icon_edit} />
                                    Edit
                                </BtnLinkSuccess>
                            </Link>
                            <ModalDelete value="Hapus" page="Pembelian" target="hapusPembelian" selectedid={id} selectedmenu="/pembelian" />
                        </div>
                    )}
                </HeadContent>
                <Divider margin="0 0 24px 0" />
                <Outlet />
            </MainCard>
        </div>
    );
};

export default Pembelian;
