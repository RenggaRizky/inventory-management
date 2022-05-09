import React, { useState } from "react";
import styles from "./style.module.css";
import { Link } from "react-router-dom";

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
import { VscTypeHierarchySub } from "react-icons/vsc";
import { FiBox } from "react-icons/fi";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp, MdOutlineInventory } from "react-icons/md";
import { RiDashboardLine } from "react-icons/ri";
import { BsTruck } from "react-icons/bs";

const Sidebar = (props) => {
    // prettier-ignore
    const {
        arrow_nav,
        icon,
        nav,
        nav_container,
        nav_wrapper,
        nav_d_none,
    } = styles

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

    return (
        <nav className={`${props.hamburgermenu ? nav_d_none : nav}`}>
            <div className={nav_container}>
                <div className={nav_wrapper}>
                    <SidebarTitle style={mx1}>Dashboard</SidebarTitle>
                    <Link to="/">
                        <SidebarBtn>
                            <RiDashboardLine className={icon} />
                            Dashboard
                        </SidebarBtn>
                    </Link>
                    <Divider />
                </div>

                <div className={nav_wrapper}>
                    <SidebarTitle style={mb1}>Produk</SidebarTitle>
                    <SidebarSubtitle>Atur Produk</SidebarSubtitle>
                    <Link to="/produk">
                        <SidebarBtn>
                            <FiBox className={icon} />
                            Produk
                        </SidebarBtn>
                    </Link>
                    <Link to="/merek">
                        <SidebarBtn>
                            <AiOutlineTag className={icon} />
                            Merek
                        </SidebarBtn>
                    </Link>
                    <Link to="/jenis-barang">
                        <SidebarBtn>
                            <VscTypeHierarchySub className={icon} />
                            Jenis Barang
                        </SidebarBtn>
                    </Link>
                    <Divider />
                </div>

                <div className={nav_wrapper}>
                    <SidebarTitle style={mb1}>Stok Barang</SidebarTitle>
                    <SidebarSubtitle>Kelola Stok Barang</SidebarSubtitle>
                    <CollapseWrapper>
                        <CollapseBtn target="inventori" onClick={onClickArrowNavigation.inventori}>
                            <div>
                                <MdOutlineInventory className={icon} />
                                Inventori
                            </div>
                            {openInventori === false ? <MdOutlineKeyboardArrowDown className={arrow_nav} /> : <MdOutlineKeyboardArrowUp className={arrow_nav} />}
                        </CollapseBtn>
                        <CollapseBox target="inventori">
                            <CollapseSidebar>Test</CollapseSidebar>
                        </CollapseBox>
                    </CollapseWrapper>

                    <Link to="/supplier">
                        <SidebarBtn>
                            <BsTruck className={icon} />
                            Supplier
                        </SidebarBtn>
                    </Link>

                    <Link to="/laporan">
                        <SidebarBtn>
                            <BiNotepad className={icon} />
                            Laporan
                        </SidebarBtn>
                    </Link>
                    <Divider />
                </div>

                <div className={nav_wrapper}>
                    <SidebarTitle style={mb1}>Pemesanan</SidebarTitle>
                    <SidebarSubtitle>Atur Pemesanan Barang</SidebarSubtitle>
                    <SidebarBtn>
                        <BiUserCircle className={icon} />
                        Test
                    </SidebarBtn>
                    <SidebarBtn>
                        <BiUserCircle className={icon} />
                        Test
                    </SidebarBtn>
                    <Divider />
                </div>

                <div className={nav_wrapper}>
                    <SidebarTitle style={mb2}>User</SidebarTitle>
                    <SidebarBtn>
                        <BiUserCircle className={icon} />
                        User
                    </SidebarBtn>
                </div>

                <div className={nav_wrapper}>
                    <div style={{ marginBottom: "15rem" }} />
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;
