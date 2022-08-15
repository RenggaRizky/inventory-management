import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { Link, Navigate, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

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
import { ErrorAlert } from "../../components/alert";
import P from "../../components/typography/paragraph";

const BarangRetur = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const pathname = location.pathname;
    const getId = location.pathname.split("/")[2];

    const [user, setUser] = useState(localStorage.getItem("profile") !== null ? JSON.parse(localStorage.getItem("profile")) : null);
    const [barangRetur, setBarangRetur] = useState(null);
    const [statusBarangRetur, setStatusBarangRetur] = useState(null);
    const [responseErrorMessage, setResponseErrorMessage] = useState(null);

    const getInfoStatusDataBarangRetur = (id) => {
        url.get(`/barang-retur/${id}`)
            .then((response) => {
                setStatusBarangRetur(response.data[0].status);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const getBarangRetur = () => {
        url.get("/barang-retur")
            .then((response) => {
                setBarangRetur(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    useEffect(() => {
        getBarangRetur();
    }, [location]);

    useEffect(() => {
        if (
            getId !== undefined &&
            pathname !== "/barang-retur" &&
            pathname !== "/barang-retur/tambah-barang-retur-1" &&
            pathname !== "/barang-retur/tambah-barang-retur-2" &&
            pathname !== "/barang-retur/edit-barang-retur-1" &&
            pathname !== "/barang-retur/edit-barang-retur-2"
        ) {
            getInfoStatusDataBarangRetur(getId);
        }
    }, [getId]);

    if (user === null) {
        return <Navigate to="/login" replace />;
    }

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
                            : pathname === "/barang-retur/edit-status-retur"
                            ? "Edit Status Barang Retur"
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
                            : pathname === "/barang-retur/edit-status-retur"
                            ? "Memperbarui status barang retur"
                            : "Detail informasi mengenai barang yang di retur"
                    }
                >
                    {pathname === "/barang-retur" && (
                        <div className={styles.action_wrapper}>
                            <div className={`${styles.search_wrapper} flex-grow-1 me-xxl-3 my-xxl-0 me-xl-3 my-xl-0 me-lg-3 my-lg-0  me-md-0 my-md-3 my-3`}>
                                <Search placeholder="Cari Produk" />
                            </div>

                            {user.user.peran !== "Pemilik Toko" && (
                                <BtnPrimary type="button" bs="align-self-stretch" onClick={() => navigate("tambah-barang-retur-1")}>
                                    <IoMdAdd className={styles.icon_add} />
                                    Tambah Barang Retur
                                </BtnPrimary>
                            )}
                        </div>
                    )}

                    {pathname !== "/barang-retur" &&
                        pathname !== "/barang-retur/tambah-barang-retur-1" &&
                        pathname !== "/barang-retur/tambah-barang-retur-2" &&
                        pathname !== "/barang-retur/edit-barang-retur-1" &&
                        pathname !== "/barang-retur/edit-barang-retur-2" &&
                        pathname !== "/barang-retur/edit-status-retur" && (
                            <div className={`${styles.detail_action_wrapper} `}>
                                {user.user.peran !== "Pemilik Toko" && (
                                    <>
                                        {statusBarangRetur === "Diproses" && (
                                            <>
                                                <Link to={"edit-barang-retur-1"} state={{ id: id }} className="text-decoration-none d-flex align-items-center">
                                                    <BtnLinkSuccess bs="text-uppercase d-flex border-0 align-items-center">
                                                        <HiOutlinePencilAlt className={styles.icon_edit} />
                                                        Edit Barang
                                                    </BtnLinkSuccess>
                                                </Link>

                                                <Link to={"edit-status-retur"} state={{ id: id }} className="text-decoration-none d-flex align-items-center">
                                                    <BtnLinkSuccess bs="text-uppercase d-flex border-0 align-items-center">
                                                        <HiOutlinePencilAlt className={styles.icon_edit} />
                                                        Edit Status
                                                    </BtnLinkSuccess>
                                                </Link>
                                            </>
                                        )}

                                        {statusBarangRetur !== "Diproses" && statusBarangRetur !== "Belum Bisa Masuk Rak (Kapasitas rak sudah penuh)" && (
                                            <ModalDelete value="Hapus" page="Barang Retur" target="hapusBarangRetur" selectedid={id} selectedmenu="/barang-retur" />
                                        )}
                                    </>
                                )}
                            </div>
                        )}
                </HeadContent>
                <Divider margin="0 0 24px 0" />
                {responseErrorMessage !== null && (
                    <ErrorAlert bs="mb-3">
                        <P fontsize="1rem">{responseErrorMessage.message}</P>
                    </ErrorAlert>
                )}
                <Outlet context={[user, setUser, responseErrorMessage, setResponseErrorMessage, barangRetur, setBarangRetur]} />
            </MainCard>
        </div>
    );
};

export default BarangRetur;
