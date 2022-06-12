import React from "react";
import styles from "./style.module.css";
import { useNavigate, useLocation, Outlet, Link, useParams } from "react-router-dom";

import { IoMdAdd } from "react-icons/io";

import MainCard from "../../components/card/main";
import HeadContent from "../../layouts/head-content";
import Divider from "../../components/divider";
import Search from "../../components/form/search";
import BtnPrimary from "../../components/button/primary";
import ModalDelete from "../../components/button/modal/delete-detail-section";
import BtnLinkSuccess from "../../components/button/link/success";
import { HiOutlinePencilAlt } from "react-icons/hi";

const Supplier = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const pathname = location.pathname;

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
                        <div className={`${styles.action_wrapper} d-flex justify-content-between align-items-center`}>
                            <div className="flex-grow-1 me-3">
                                <Search placeholder="Cari Supplier" />
                            </div>
                            <BtnPrimary type="button" bs="align-self-stretch" onClick={() => navigate("tambah-supplier")}>
                                <IoMdAdd className={styles.icon_add} />
                                Tambah Supplier
                            </BtnPrimary>
                        </div>
                    )}

                    {pathname !== "/supplier" && pathname !== "/supplier/tambah-supplier" && pathname !== "/supplier/edit-supplier" && (
                        <div className="d-flex justify-content-end align-items-center">
                            <Link to={"edit-supplier"} state={{ id: id }} className="text-decoration-none d-flex align-items-center">
                                <BtnLinkSuccess bs="text-uppercase d-flex border-0 align-items-center">
                                    <HiOutlinePencilAlt className={styles.icon_edit} />
                                    Edit
                                </BtnLinkSuccess>
                            </Link>
                            <ModalDelete value="Hapus" page="Supplier" target="hapusSupplier" selectedid={id} selectedmenu="/supplier" />
                        </div>
                    )}
                </HeadContent>
                <Divider margin="0 0 24px 0" />
                <Outlet />
            </MainCard>
        </div>
    );
};

export default Supplier;
