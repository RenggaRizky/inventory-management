import React, { useEffect, useState } from "react";
import { Link, Navigate, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
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
import { ErrorAlert } from "../../components/alert";
import P from "../../components/typography/paragraph";
import { url } from "../../api";

const Penjualan = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const pathname = location.pathname;

    const [user, setUser] = useState(localStorage.getItem("profile") !== null ? JSON.parse(localStorage.getItem("profile")) : null);
    const [responseErrorMessage, setResponseErrorMessage] = useState(null);
    const [text, setText] = useState("");
    const [penjualan, setPenjualan] = useState(null);

    const getPencarianPenjualan = () => {
        url.post("/penjualan/filter", { text })
            .then((response) => {
                setPenjualan(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        getPencarianPenjualan();
    };

    const getPenjualan = () => {
        url.get("penjualan")
            .then((response) => {
                setPenjualan(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    useEffect(() => {
        getPenjualan();
    }, [location]);

    if (user === null) {
        return <Navigate to="/login" replace />;
    }

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
                        <div className={styles.action_wrapper}>
                            <div className={`${styles.search_wrapper} flex-grow-1 me-xxl-3 my-xxl-0 me-xl-3 my-xl-0 me-lg-3 my-lg-0  me-md-0 my-md-3 my-3`}>
                                <Search placeholder="Cari Nomor Nota Penjualan" value={text} onchange={(e) => setText(e.target.value)} onsubmit={handleSearch} />
                            </div>

                            {user.user.peran !== "Pemilik Toko" && (
                                <BtnPrimary type="button" bs="align-self-stretch" onClick={() => navigate("tambah-penjualan")}>
                                    <IoMdAdd className={styles.icon_add} />
                                    Tambah Penjualan
                                </BtnPrimary>
                            )}
                        </div>
                    )}

                    {pathname !== "/penjualan" && pathname !== "/penjualan/tambah-penjualan" && pathname !== "/penjualan/edit-penjualan" && (
                        <div className={`${styles.detail_action_wrapper} d-flex align-items-center`}>
                            {user.user.peran !== "Pemilik Toko" && (
                                <>
                                    <ModalDelete value="Hapus" page="Penjualan" target="hapusPenjualan" selectedid={id} selectedmenu="/penjualan" />
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
                <Outlet context={[user, setUser, responseErrorMessage, setResponseErrorMessage, penjualan, setPenjualan]} />
            </MainCard>
        </div>
    );
};

export default Penjualan;
