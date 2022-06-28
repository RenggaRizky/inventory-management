import React from "react";
import styles from "./style.module.css";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import MainCard from "../../components/card/main";
import HeadContent from "../../layouts/head-content";
import Search from "../../components/form/search";
import Divider from "../../components/divider";
import BtnLinkSuccess from "../../components/button/link/success";
import { HiOutlinePencilAlt } from "react-icons/hi";

const StokBarang = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const pathname = location.pathname;
    return (
        <div className={styles.wrapper}>
            <MainCard>
                <HeadContent
                    title={pathname === "/stok-barang" ? "Stok Barang" : pathname === "/stok-barang/edit-stok-barang" ? "Edit Aturan Stok Barang" : "Detail Stok Barang"}
                    subtitle={
                        pathname === "/stok-barang"
                            ? "Kumpulan informasi mengenai stok barang di toko dan gudang"
                            : pathname === "/stok-barang/edit-stok-barang"
                            ? "Memperbarui pengaturan stok barang mengenai batas minimum stok"
                            : "Detail informasi mengenai stok suatu produk"
                    }
                >
                    {pathname === "/stok-barang" && (
                        <div>
                            <Search placeholder="Cari Produk" />
                        </div>
                    )}

                    {pathname !== "/stok-barang" && pathname !== "/stok-barang/edit-stok-barang" && (
                        <Link to={"edit-stok-barang"} state={{ id: id }} className="text-decoration-none d-flex justify-content-end align-items-end">
                            <BtnLinkSuccess bs="text-uppercase d-flex border-0 align-items-center">
                                <HiOutlinePencilAlt className={styles.icon_edit} />
                                Edit
                            </BtnLinkSuccess>
                        </Link>
                    )}
                </HeadContent>
                <Divider margin="0 0 24px 0" />
                <Outlet />
            </MainCard>
        </div>
    );
};

export default StokBarang;
