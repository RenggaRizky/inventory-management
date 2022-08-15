import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { Link, Navigate, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import MainCard from "../../components/card/main";
import HeadContent from "../../layouts/head-content";
import Search from "../../components/form/search";
import Divider from "../../components/divider";
import BtnLinkSuccess from "../../components/button/link/success";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { url } from "../../api";

const StokBarang = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const pathname = location.pathname;

    const [user, setUser] = useState(localStorage.getItem("profile") !== null ? JSON.parse(localStorage.getItem("profile")) : null);
    const [stok, setStok] = useState(null);
    const [text, setText] = useState("");

    const getPencarianStokBarang = () => {
        url.post("/stok-barang/filter", { text })
            .then((response) => {
                setStok(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        getPencarianStokBarang();
    };

    const getStok = () => {
        url.get("stok-barang")
            .then((response) => {
                setStok(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    useEffect(() => {
        getStok();
    }, []);

    if (user === null) {
        return <Navigate to="/login" replace />;
    }
    return (
        <div className={styles.wrapper}>
            <MainCard>
                <HeadContent title="Stok Barang" subtitle="Kumpulan informasi mengenai stok barang di toko dan gudang">
                    <div className={`${styles.search_wrapper} flex-grow-1 me-xxl-3 my-xxl-0 me-xl-3 my-xl-0 me-lg-3 my-lg-0  me-md-0 my-md-3 my-3`}>
                        <Search placeholder="Cari Produk" value={text} onchange={(e) => setText(e.target.value)} onsubmit={handleSearch} />
                    </div>
                </HeadContent>
                <Divider margin="0 0 24px 0" />
                <Outlet context={[user, setUser, stok, setStok]} />
            </MainCard>
        </div>
    );
};

export default StokBarang;
