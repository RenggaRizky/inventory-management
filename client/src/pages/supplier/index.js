import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { useNavigate, useLocation, Outlet, Link, useParams, Navigate } from "react-router-dom";

import { IoMdAdd } from "react-icons/io";

import MainCard from "../../components/card/main";
import HeadContent from "../../layouts/head-content";
import Divider from "../../components/divider";
import Search from "../../components/form/search";
import BtnPrimary from "../../components/button/primary";
import ModalDelete from "../../components/button/modal/delete-detail-section";
import BtnLinkSuccess from "../../components/button/link/success";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { url } from "../../api";
import ModalDeleteMain from "../../components/button/modal/delete-main-section";

const Supplier = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const pathname = location.pathname;

    const [user, setUser] = useState(localStorage.getItem("profile") !== null ? JSON.parse(localStorage.getItem("profile")) : null);
    const [supplier, setSupplier] = useState(null);
    const [text, setText] = useState("");

    const getPencarianSupplier = () => {
        url.post("/supplier/filter", { text })
            .then((response) => {
                setSupplier(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        getPencarianSupplier();
    };

    const getSupplier = () => {
        url.get("supplier")
            .then((response) => {
                setSupplier(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    useEffect(() => {
        getSupplier();
    }, [location]);

    if (user === null) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className={styles.wrapper}>
            <MainCard>
                <HeadContent
                    title={pathname === "/supplier" ? "Supplier" : pathname === "/supplier/tambah-supplier" ? "Tambah Supplier" : pathname === "/supplier/edit-supplier" ? "Edit Supplier" : "Detail Supplier"}
                    subtitle={
                        pathname === "/supplier"
                            ? "Kumpulan data mengenai supplier barang"
                            : pathname === "/supplier/tambah-supplier"
                            ? "Menambah data supplier barang"
                            : pathname === "/supplier/edit-supplier"
                            ? "Memperbarui data supplier barang"
                            : "Detail informasi mengenai supplier"
                    }
                >
                    {pathname === "/supplier" && (
                        <div className={styles.action_wrapper}>
                            <div className={`${styles.search_wrapper} flex-grow-1 me-xxl-3 my-xxl-0 me-xl-3 my-xl-0 me-lg-3 my-lg-0  me-md-0 my-md-3 my-3 `}>
                                <Search placeholder="Cari Supplier" value={text} onchange={(e) => setText(e.target.value)} onsubmit={handleSearch} />
                            </div>

                            {user.user.peran !== "Pemilik Toko" && (
                                <BtnPrimary type="button" bs="align-self-stretch" onClick={() => navigate("tambah-supplier")}>
                                    <IoMdAdd className={styles.icon_add} />
                                    Tambah Supplier
                                </BtnPrimary>
                            )}
                        </div>
                    )}

                    {pathname !== "/supplier" && pathname !== "/supplier/tambah-supplier" && pathname !== "/supplier/edit-supplier" && (
                        <div className={`${styles.detail_action_wrapper} d-flex align-items-center`}>
                            {user.user.peran !== "Pemilik Toko" && (
                                <>
                                    <Link to={"edit-supplier"} state={{ id: id }} className="text-decoration-none d-flex align-items-center">
                                        <BtnLinkSuccess bs="text-uppercase d-flex border-0 align-items-center">
                                            <HiOutlinePencilAlt className={styles.icon_edit} />
                                            Edit
                                        </BtnLinkSuccess>
                                    </Link>
                                    <ModalDeleteMain value="Hapus" page="Supplier" target="hapusSupplier" selectedid={id} selectedmenu="/supplier" setdata={setSupplier} />
                                </>
                            )}
                        </div>
                    )}
                </HeadContent>
                <Divider margin="0 0 24px 0" />
                <Outlet context={[user, setUser, supplier, setSupplier]} />
            </MainCard>
        </div>
    );
};

export default Supplier;
