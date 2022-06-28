import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import { useNavigate, Outlet, NavLink, useLocation } from "react-router-dom";

import { IoMdAdd } from "react-icons/io";

import MainCard from "../../components/card/main";
import HeadContent from "../../layouts/head-content";
import Divider from "../../components/divider";
import { H4 } from "../../components/typography/heading";
import BtnPrimary from "../../components/button/primary";
import { url } from "../../api";
import Spinner from "../../components/spinner";
import Search from "../../components/form/search";
import { BsHddRack } from "react-icons/bs";
import { TitleRackList } from "../../components/typography/title";
import Subtitle from "../../components/typography/subtitle";
import P from "../../components/typography/paragraph";

const Rak = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;

    const [rak, setRak] = useState(null);

    const getRak = () => {
        url.get("/rak")
            .then((response) => {
                setRak(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getRak();
    }, []);

    return (
        <div className={styles.wrapper}>
            <MainCard>
                <HeadContent title="Rak" subtitle="Kumpulan rak yang dapat dipakai untuk menyimpan barang">
                    <div className={`${styles.action_wrapper} d-flex justify-content-end align-items-center`}>
                        <div className="flex-grow-1 me-3">
                            <Search placeholder="Cari Rak" />
                        </div>
                        <BtnPrimary type="button" bs="align-self-stretch" onClick={() => navigate("/tambah-rak")}>
                            <IoMdAdd className={styles.icon_add} />
                            Tambah Rak
                        </BtnPrimary>
                    </div>
                </HeadContent>

                <Divider margin="0 0 24px 0" />
                <div className="row">
                    <div className="col-7">
                        {pathname === "/rak" ? (
                            <div style={{ minHeight: "60vh" }} className="d-flex justify-content-center align-items-center flex-column">
                                <P texttransform="uppercase">Pilih rak yang ada di daftar rak</P>
                            </div>
                        ) : (
                            <Outlet />
                        )}
                    </div>
                    <div className="col">
                        <div className={styles.list_wrapper}>
                            <H4 margin="0 0 32px 0">Daftar Rak</H4>
                            <div className={styles.list_container}>
                                {rak === null ? (
                                    <Spinner bs="align-middle" />
                                ) : (
                                    rak.map((x) => {
                                        return (
                                            <NavLink to={x._id} className={({ isActive }) => (isActive ? styles.active_link : styles.noactive_link)} style={{ textDecoration: "none" }}>
                                                <div key={x._id} className="d-flex align-items-center">
                                                    <div className={`${styles.rack_icon_wrapper} d-flex justify-content-center align-items-center rounded-circle`}>
                                                        <BsHddRack />
                                                    </div>
                                                    <div>
                                                        <TitleRackList texttransform="uppercase">{x.nama}</TitleRackList>
                                                        <Subtitle texttransform="lowercase">{x.lokasi}</Subtitle>
                                                    </div>
                                                </div>
                                            </NavLink>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </MainCard>
        </div>
    );
};

export default Rak;
