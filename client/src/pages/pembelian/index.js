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

const Pembelian = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const pathname = location.pathname;

    const [user, setUser] = useState(localStorage.getItem("profile") !== null ? JSON.parse(localStorage.getItem("profile")) : null);
    const [responseErrorMessage, setResponseErrorMessage] = useState(null);
    const [pembelian, setPembelian] = useState(null);
    const [text, setText] = useState("");

    const getPencarianPembelian = () => {
        url.post("/pembelian/filter", { text })
            .then((response) => {
                setPembelian(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        getPencarianPembelian();
    };

    const getPembelian = () => {
        url.get("pembelian")
            .then((response) => {
                setPembelian(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    useEffect(() => {
        getPembelian();
    }, [location]);

    if (user === null) {
        return <Navigate to="/login" replace />;
    }
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
                        <div className={styles.action_wrapper}>
                            <div className={`${styles.search_wrapper} flex-grow-1 me-xxl-3 my-xxl-0 me-xl-3 my-xl-0 me-lg-3 my-lg-0  me-md-0 my-md-3 my-3`}>
                                <Search placeholder="Cari Nomor Nota Pembelian" value={text} onchange={(e) => setText(e.target.value)} onsubmit={handleSearch} />
                            </div>

                            {user.user.peran !== "Pemilik Toko" && (
                                <BtnPrimary type="button" bs="align-self-stretch" onClick={() => navigate("tambah-pembelian")}>
                                    <IoMdAdd className={styles.icon_add} />
                                    Tambah Pembelian
                                </BtnPrimary>
                            )}
                        </div>
                    )}

                    {pathname !== "/pembelian" && pathname !== "/pembelian/tambah-pembelian" && pathname !== "/pembelian/edit-pembelian" && (
                        <div className={`${styles.detail_action_wrapper} d-flex align-items-center`}>
                            {user.user.peran !== "Pemilik Toko" && (
                                <>
                                    <ModalDelete value="Hapus" page="Pembelian" target="hapusPembelian" selectedid={id} selectedmenu="/pembelian" />
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

                <Outlet context={[user, setUser, responseErrorMessage, setResponseErrorMessage, pembelian, setPembelian]} />
            </MainCard>
        </div>
    );
};

export default Pembelian;
