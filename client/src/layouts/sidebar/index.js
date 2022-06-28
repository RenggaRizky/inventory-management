import React, { useState } from "react";
import styles from "./style.module.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import CollapseBox from "../../components/collapse/collapse-box";
import CollapseBtn from "../../components/collapse/collapse-btn";
import CollapseWrapper from "../../components/collapse/collapse-wrapper";
import CollapseSidebar from "../../components/button/collapse-sidebar";
import Divider from "../../components/divider";
import SidebarBtn from "../../components/button/sidebar";
import SidebarSubtitle from "../../components/typography/sidebar-subtitle";
import SidebarTitle from "../../components/typography/sidebar-title";

import { AiOutlineTag } from "react-icons/ai";
import { BiNotepad, BiUserCircle } from "react-icons/bi";
import { FiBox } from "react-icons/fi";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp, MdOutlineInventory, MdOutlineCategory } from "react-icons/md";
import { RiDashboardLine } from "react-icons/ri";
import { BsTruck } from "react-icons/bs";
import { CgRuler } from "react-icons/cg";
import { TbPackgeImport, TbPackgeExport } from "react-icons/tb";

const Sidebar = (props) => {
    const mb1 = {
        marginBottom: "1px",
    };

    const mb2 = {
        marginBottom: "12px",
    };

    const mx1 = {
        margin: "10px 0 12px 0",
    };

    const [openInventori, setOpenInventori] = useState(false);

    const onClickArrowNavigation = {
        inventori: () => {
            setOpenInventori(!openInventori);
        },
    };

    const location = useLocation();
    const pathname = location.pathname;

    return (
        <nav className={`${props.hamburgermenu ? styles.nav_d_none : styles.nav}`}>
            <div className={styles.nav_container}>
                <div className={styles.nav_wrapper}>
                    <SidebarTitle style={mx1}>Dashboard</SidebarTitle>
                    <Link to="/">
                        <SidebarBtn menu={pathname === "/" ? "/" : pathname === "/dashboard" ? "/dashboard" : "home"}>
                            <RiDashboardLine className={styles.icon} />
                            Dashboard
                        </SidebarBtn>
                    </Link>
                    <Divider margin="18px 0" />
                </div>

                <div className={styles.nav_wrapper}>
                    <SidebarTitle style={mb1}>Produk</SidebarTitle>
                    <SidebarSubtitle>Atur Produk</SidebarSubtitle>
                    <Link to="produk">
                        <SidebarBtn menu="/produk">
                            <FiBox className={styles.icon} />
                            Produk
                        </SidebarBtn>
                    </Link>
                    <Link to="merek">
                        <SidebarBtn menu="/merek">
                            <AiOutlineTag className={styles.icon} />
                            Merek
                        </SidebarBtn>
                    </Link>
                    <Link to="jenis-barang">
                        <SidebarBtn menu="/jenis-barang">
                            <MdOutlineCategory className={styles.icon} />
                            Jenis Barang
                        </SidebarBtn>
                    </Link>
                    <Link to="satuan-barang">
                        <SidebarBtn menu="/satuan-barang">
                            <CgRuler className={styles.icon} />
                            Satuan Barang
                        </SidebarBtn>
                    </Link>
                    <Divider margin="18px 0" />
                </div>

                <div className={styles.nav_wrapper}>
                    <SidebarTitle style={mb1}>Stok Barang</SidebarTitle>
                    <SidebarSubtitle>Kelola Stok Barang</SidebarSubtitle>
                    <CollapseWrapper>
                        <CollapseBtn target="inventori" onClick={onClickArrowNavigation.inventori}>
                            <div>
                                <MdOutlineInventory className={styles.icon} />
                                Inventori
                            </div>
                            {openInventori === false ? <MdOutlineKeyboardArrowDown className={styles.arrow_nav} /> : <MdOutlineKeyboardArrowUp className={styles.arrow_nav} />}
                        </CollapseBtn>
                        <CollapseBox target="inventori">
                            <Link to="stok-barang">
                                <CollapseSidebar menu="/stok-barang">Stok Barang</CollapseSidebar>
                            </Link>
                            <CollapseSidebar>Barang Masuk</CollapseSidebar>
                            <CollapseSidebar>Barang Keluar</CollapseSidebar>
                            <Link to="barang-retur">
                                <CollapseSidebar menu="/barang-retur">Barang Retur</CollapseSidebar>
                            </Link>
                            <Link to="rak">
                                <CollapseSidebar menu="/rak">Rak Penyimpanan</CollapseSidebar>
                            </Link>
                        </CollapseBox>
                    </CollapseWrapper>

                    <Link to="supplier">
                        <SidebarBtn menu={"supplier"}>
                            <BsTruck className={styles.icon} />
                            Supplier
                        </SidebarBtn>
                    </Link>

                    <Link to="laporan">
                        <SidebarBtn>
                            <BiNotepad className={styles.icon} />
                            Laporan
                        </SidebarBtn>
                    </Link>
                    <Divider margin="18px 0" />
                </div>

                <div className={styles.nav_wrapper}>
                    <SidebarTitle style={mb1}>Pemesanan</SidebarTitle>
                    <SidebarSubtitle>Atur Pemesanan Barang</SidebarSubtitle>
                    <Link to="pembelian">
                        <SidebarBtn menu={"pembelian"}>
                            <TbPackgeImport className={styles.icon} />
                            Pembelian
                        </SidebarBtn>
                    </Link>

                    <Link to="penjualan">
                        <SidebarBtn menu={"penjualan"}>
                            <TbPackgeExport className={styles.icon} />
                            Penjualan
                        </SidebarBtn>
                    </Link>
                    <Divider margin="18px 0" />
                </div>

                <div className={styles.nav_wrapper}>
                    <SidebarTitle style={mb2}>User</SidebarTitle>
                    <SidebarBtn>
                        <BiUserCircle className={styles.icon} />
                        User
                    </SidebarBtn>
                </div>

                <div className={styles.nav_wrapper}>
                    <div style={{ marginBottom: "15rem" }} />
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;
