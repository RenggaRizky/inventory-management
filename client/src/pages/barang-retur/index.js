import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

import { IoMdAdd } from "react-icons/io";
import { HiOutlinePencilAlt } from "react-icons/hi";

import HeadContent from "../../layouts/head-content";
import MainCard from "../../components/card/main";
import Search from "../../components/form/search";
import BtnPrimary from "../../components/button/primary";
import Divider from "../../components/divider";
import BtnLinkSuccess from "../../components/button/link/success";
import ModalDelete from "../../components/button/modal/delete-detail-section";
import { url } from "../../api";

const BarangRetur = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const pathname = location.pathname;

    const [statusBarangRetur, setStatusBarangRetur] = useState(null);
    const getInfoStatusDataBarangRetur = (id) => {
        url.get(`/barang-retur/${id}`)
            .then((response) => {
                setStatusBarangRetur(response.data[0].status);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    useEffect(() => {
        getInfoStatusDataBarangRetur();
    }, [statusBarangRetur]);

    return (
        <div className={styles.wrapper}>
            <MainCard>
                <HeadContent
                    title={
                        pathname === "/barang-retur"
                            ? "Barang Retur"
                            : pathname === "/barang-retur/tambah-barang-retur-1"
                            ? "Tambah Barang Retur"
                            : pathname === "/barang-retur/tambah-barang-retur-2"
                            ? "Tambah Barang Retur"
                            : pathname === "/barang-retur/edit-barang-retur-1"
                            ? "Edit Barang Retur"
                            : pathname === "/barang-retur/edit-barang-retur-2"
                            ? "Edit Barang Retur"
                            : "Detail Barang Retur"
                    }
                    subtitle={
                        pathname === "/barang-retur"
                            ? "Kumpulan informasi mengenai barang yang di retur"
                            : pathname === "/barang-retur/tambah-barang-retur-1"
                            ? "Menambah barang yang di retur"
                            : pathname === "/barang-retur/tambah-barang-retur-2"
                            ? "Menambah barang yang di retur"
                            : pathname === "/barang-retur/edit-barang-retur-1"
                            ? "Memperbarui barang yang di retur"
                            : pathname === "/barang-retur/edit-barang-retur-2"
                            ? "Memperbarui barang yang di retur"
                            : "Detail informasi mengenai barang yang di retur"
                    }
                >
                    {pathname === "/barang-retur" && (
                        <div className={`${styles.action_wrapper} d-flex justify-content-between align-items-center`}>
                            <div className="flex-grow-1 me-3">
                                <Search placeholder="Cari Produk" />
                            </div>
                            <BtnPrimary type="button" bs="align-self-stretch" onClick={() => navigate("tambah-barang-retur-1")}>
                                <IoMdAdd className={styles.icon_add} />
                                Tambah Barang Retur
                            </BtnPrimary>
                        </div>
                    )}

                    {pathname !== "/barang-retur" &&
                        pathname !== "/barang-retur/tambah-barang-retur-1" &&
                        pathname !== "/barang-retur/tambah-barang-retur-2" &&
                        pathname !== "/barang-retur/edit-barang-retur-1" &&
                        pathname !== "/barang-retur/edit-barang-retur-2" && (
                            <div className="d-flex justify-content-end align-items-center">
                                {statusBarangRetur !== "Diproses" && (
                                    <Link to={"edit-barang-retur-1"} state={{ id: id }} className="text-decoration-none d-flex align-items-center">
                                        <BtnLinkSuccess bs="text-uppercase d-flex border-0 align-items-center">
                                            <HiOutlinePencilAlt className={styles.icon_edit} />
                                            Edit
                                        </BtnLinkSuccess>
                                    </Link>
                                )}
                                <ModalDelete value="Hapus" page="Barang Retur" target="hapusBarangRetur" selectedid={id} selectedmenu="/barang-retur" />
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
