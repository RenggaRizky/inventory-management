import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation, Navigate } from "react-router-dom";
import styles from "./style.module.css";

import { IoMdAdd } from "react-icons/io";

import Search from "../../components/form/search";
import MainCard from "../../components/card/main";
import HeadContent from "../../layouts/head-content";
import Divider from "../../components/divider";
import BtnPrimary from "../../components/button/primary";
import { url } from "../../api";

const Merek = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;
    const route = pathname.split("/");

    const [user, setUser] = useState(localStorage.getItem("profile") !== null ? JSON.parse(localStorage.getItem("profile")) : null);
    const [merek, setMerek] = useState(null);
    const [text, setText] = useState("");

    const getPencarianMerek = () => {
        url.post("/merek/filter", { text })
            .then((response) => {
                setMerek(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        getPencarianMerek();
    };

    const getMerek = () => {
        url.get("merek")
            .then((response) => {
                setMerek(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    useEffect(() => {
        getMerek();
    }, [location]);

    if (user === null) {
        return <Navigate to="/login" replace />;
    }

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
                        <div className={styles.action_wrapper}>
                            <div className={`${styles.search_wrapper} flex-grow-1 me-xxl-3 my-xxl-0 me-xl-3 my-xl-0 me-lg-3 my-lg-0  me-md-0 my-md-3 my-3`}>
                                <Search placeholder="Cari Merek" value={text} onchange={(e) => setText(e.target.value)} onsubmit={handleSearch} />
                            </div>
                            {user.user.peran !== "Pemilik Toko" && (
                                <BtnPrimary type="button" bs="align-self-stretch" onClick={() => navigate("tambah-merek")}>
                                    <IoMdAdd className={styles.icon_add} />
                                    Tambah Merek
                                </BtnPrimary>
                            )}
                        </div>
                    )}
                </HeadContent>
                <Divider margin="0 0 24px 0" />

                <Outlet context={[user, setUser, merek, setMerek]} />
            </MainCard>
        </div>
    );
};

export default Merek;
