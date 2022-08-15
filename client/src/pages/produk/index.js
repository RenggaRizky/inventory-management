import React, { useEffect, useState } from "react";
import { Link, Navigate, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
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
import { url } from "../../api";
import { ErrorAlert } from "../../components/alert";
import P from "../../components/typography/paragraph";

const Produk = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const pathname = location.pathname;

    const [user, setUser] = useState(localStorage.getItem("profile") !== null ? JSON.parse(localStorage.getItem("profile")) : null);
    const [produk, setProduk] = useState(null);
    const [text, setText] = useState("");
    const [responseErrorMessage, setResponseErrorMessage] = useState(null);

    const getProduk = () => {
        url.get("produk")
            .then((response) => {
                setProduk(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const getPencarianProduk = () => {
        url.post("/produk/filter", { text })
            .then((response) => {
                setProduk(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        getPencarianProduk();
    };

    useEffect(() => {
        getProduk();
    }, [location]);

    if (user === null) {
        return <Navigate to="/login" replace />;
    }

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
                        <div className={styles.action_wrapper}>
                            <div className={`${styles.search_wrapper} flex-grow-1 me-xxl-3 my-xxl-0 me-xl-3 my-xl-0 me-lg-3 my-lg-0  me-md-0 my-md-3 my-3 `}>
                                <Search placeholder="Cari Produk" value={text} onchange={(e) => setText(e.target.value)} onsubmit={handleSearch} />
                            </div>

                            {user.user.peran !== "Pemilik Toko" && (
                                <BtnPrimary type="button" bs="align-self-stretch" onClick={() => navigate("tambah-produk")}>
                                    <IoMdAdd className={styles.icon_add} />
                                    Tambah Produk
                                </BtnPrimary>
                            )}
                        </div>
                    )}

                    {pathname !== "/produk" && pathname !== "/produk/tambah-produk" && pathname !== "/produk/edit-produk" && (
                        <div className={`${styles.detail_action_wrapper} d-flex align-items-center`}>
                            {user.user.peran !== "Pemilik Toko" && (
                                <>
                                    <Link to={"edit-produk"} state={{ id: id }} className="text-decoration-none d-flex align-items-center">
                                        <BtnLinkSuccess bs="text-uppercase d-flex border-0 align-items-center">
                                            <HiOutlinePencilAlt className={styles.icon_edit} />
                                            Edit
                                        </BtnLinkSuccess>
                                    </Link>
                                    <ModalDelete value="Hapus" page="Produk" target="hapusProduk" selectedid={id} selectedmenu="/produk" />
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

                <Outlet context={[user, setUser, produk, setProduk, responseErrorMessage, setResponseErrorMessage]} />
            </MainCard>
        </div>
    );
};

export default Produk;
