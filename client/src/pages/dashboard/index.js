import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { DashboardCardPrimary, DashboardCardSecondary } from "../../components/card/dashboard";
import MainCard from "../../components/card/main";
import { H5, H6 } from "../../components/typography/heading";
import Subtitle from "../../components/typography/subtitle";
import styles from "./style.module.css";
import { FiBox } from "react-icons/fi";
import { MdOutlineInventory } from "react-icons/md";
import { TbPackgeExport, TbPackgeImport } from "react-icons/tb";
import { url } from "../../api";
import Spinner from "../../components/spinner";
import SpinnerWhite from "../../components/spinner-white";
import moment from "moment";
import "moment/locale/id";
import Divider from "../../components/divider";

const Dashboard = () => {
    const [user, setUser] = useState(localStorage.getItem("profile") !== null ? JSON.parse(localStorage.getItem("profile")) : null);
    const [produk, setProduk] = useState(null);
    const [barangMasuk, setBarangMasuk] = useState(null);
    const [barangKeluar, setBarangKeluar] = useState(null);
    const [barangRetur, setBarangRetur] = useState(null);

    let currentDate = new Date();
    let getCurrentDay = currentDate.getDate() <= 9 ? "0" + currentDate.getDate() : currentDate.getDate();
    let getCurrentMonth = currentDate.getMonth() + 1 <= 9 ? "0" + Number(currentDate.getMonth() + 1) : currentDate.getMonth() + 1;
    let currentMonth = getCurrentMonth;
    let currentDay = getCurrentDay;
    let currentYear = currentDate.getFullYear();

    const tomorrow = (long = false) => {
        currentDate.setDate(currentDate.getDate() + 1);
        const ret = `${currentYear}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;
        return !long ? ret : `${ret}T00:00:00`;
    };

    const getProduk = () => {
        url.get("produk")
            .then((response) => {
                setProduk(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const getBarangMasukHariIni = () => {
        url.get(`/barang-masuk/hari-ini`)
            .then((response) => {
                setBarangMasuk(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    // BARANG KELUAR
    const getBarangKeluarHariIni = () => {
        url.get(`/barang-keluar/hari-ini`)
            .then((response) => {
                setBarangKeluar(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const getBarangRetur = () => {
        url.get("/barang-retur")
            .then((response) => {
                setBarangRetur(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const countBarangMasukKeluar = (data) => {
        let firstCount;

        if (data === barangMasuk) {
            firstCount = data.map((x) => x.barangMasuk.map((y) => y.jumlahMasuk).reduce((previous, current) => Number(previous) + Number(current), 0));
        } else if (data === barangKeluar) {
            firstCount = data.map((x) => x.barangKeluar.map((y) => y.jumlahKeluar).reduce((previous, current) => Number(previous) + Number(current), 0));
        }
        const secondCount = firstCount.reduce((previous, current) => previous + current, 0);
        return secondCount;
    };

    const countBarangRetur = (data) => {
        const filterByDate = data.filter((x) => x.tanggalPengembalian > `${currentYear}-${currentMonth}-${currentDay}` && x.tanggalPengembalian < tomorrow());
        const countData = filterByDate.reduce((previous, current) => Number(previous) + Number(current.jumlah), 0);
        return countData;
    };

    useEffect(() => {
        getProduk();
        getBarangMasukHariIni();
        getBarangKeluarHariIni();
        getBarangRetur();
    }, []);

    if (user === null) {
        return <Navigate to='/login' replace />;
    }

    return (
        <div className={styles.wrapper}>
            <MainCard>
                <div className='row mb-5'>
                    <div className='col-md-6 col-lg-3 col-xl-3 mb-3 mb-md-4 mb-lg-0'>
                        {produk === null ? (
                            <DashboardCardPrimary title='' subtitle=''>
                                <div className='my-5'>
                                    <SpinnerWhite />
                                </div>
                            </DashboardCardPrimary>
                        ) : (
                            <DashboardCardPrimary title={produk.length !== 0 ? produk.reduce((previous, current) => previous + current.stok.total, 0) : "0"} subtitle='Jumlah Stok'>
                                <FiBox className={styles.icon_db} />
                            </DashboardCardPrimary>
                        )}
                    </div>
                    <div className='col-md-6 col-lg-3 col-xl-3 mb-3 mb-md-4 mb-lg-0'>
                        {barangMasuk === null ? (
                            <DashboardCardPrimary title='' subtitle=''>
                                <div className='my-5'>
                                    <SpinnerWhite />
                                </div>
                            </DashboardCardPrimary>
                        ) : (
                            <DashboardCardPrimary title={countBarangMasukKeluar(barangMasuk)} subtitle='Jumlah Masuk' date={`(${moment(currentDate).format("L")})`}>
                                <TbPackgeImport className={styles.icon_db} />
                            </DashboardCardPrimary>
                        )}
                    </div>
                    <div className='col-md-6 col-lg-3 col-xl-3 mb-3 mb-md-4 mb-lg-0'>
                        {barangKeluar === null ? (
                            <DashboardCardPrimary title='' subtitle=''>
                                <div className='my-5'>
                                    <SpinnerWhite />
                                </div>
                            </DashboardCardPrimary>
                        ) : (
                            <DashboardCardPrimary title={countBarangMasukKeluar(barangKeluar)} subtitle='Jumlah Keluar' date={`(${moment(currentDate).format("L")})`}>
                                <TbPackgeExport className={styles.icon_db} />
                            </DashboardCardPrimary>
                        )}
                    </div>
                    <div className='col-md-6 col-lg-3 col-xl-3 mb-3 mb-md-4 mb-lg-0'>
                        {barangRetur === null ? (
                            <DashboardCardPrimary title='' subtitle=''>
                                <div className='my-5'>
                                    <SpinnerWhite />
                                </div>
                            </DashboardCardPrimary>
                        ) : (
                            <DashboardCardPrimary title={countBarangRetur(barangRetur)} subtitle='Jumlah Retur' date={`(${moment(currentDate).format("L")})`}>
                                <MdOutlineInventory className={styles.icon_db} />
                            </DashboardCardPrimary>
                        )}
                    </div>
                </div>

                <div className='row'>
                    <div className='col-xxl-8 col-lg-7 mb-4 mb-md-5 mb-lg-0 mb-xxl-0'>
                        {produk === null ? (
                            <DashboardCardSecondary title='Pratinjau Jumlah Stok'>
                                <Spinner />
                            </DashboardCardSecondary>
                        ) : (
                            <DashboardCardSecondary title='Pratinjau Jumlah Stok'>
                                {produk.slice(0, 3).map((x) => {
                                    return (
                                        <>
                                            <div className={`${styles.content_card_secondary} p-2 `}>
                                                <div className='d-flex align-items-center'>
                                                    <img src={`data:image/png;base64, ${x.gambar}`} alt={x.nama} className={styles.product_picture} />
                                                    <div className='ms-4'>
                                                        <H6 texttransform='uppercase'>{x.nama}</H6>
                                                        <Subtitle fontsize='0.75rem'>
                                                            {x.id_rak[0].nama} {x.id_rak[0].susun.nama} - {x.id_rak[0].lokasi}
                                                        </Subtitle>
                                                    </div>
                                                </div>

                                                <div className='d-flex align-items-center row gx-4 flex-nowrap'>
                                                    <div className='col text-nowrap align-self-end'>
                                                        <span className={[x.stok.status === "Tersedia" ? styles.status_wrapper_accepted : x.stok.status === "Habis" || x.stok.status === "Penuh" ? styles.status_wrapper_rejected : styles.status_wrapper_process, "d-flex align-items-center"].join(" ")}>{x.stok.status}</span>
                                                    </div>
                                                    <div className='col text-center '>
                                                        <Subtitle fontsize='0.75rem'>STOK</Subtitle>
                                                        <H5 fontweight='600'>{x.stok.total}</H5>
                                                    </div>
                                                </div>
                                            </div>
                                            <Divider margin='0.5rem 0' />
                                        </>
                                    );
                                })}
                                <div className='text-center p-4'>
                                    <Link className='link-dark' to='/stok-barang'>
                                        Lihat Semua
                                    </Link>
                                </div>
                            </DashboardCardSecondary>
                        )}
                    </div>

                    <div className='col-xxl-4 col-lg-5 mb-4 mb-md-5 mb-lg-0 mb-xxl-0'>
                        {barangRetur === null ? (
                            <DashboardCardSecondary title='Barang Retur Yang Masih Diproses'>
                                <Spinner />
                            </DashboardCardSecondary>
                        ) : (
                            <DashboardCardSecondary title='Barang Retur Yang Masih Diproses'>
                                {barangRetur
                                    .slice(0, 3)
                                    .filter((x) => x.status === "Diproses")
                                    .map((y) => {
                                        return (
                                            <>
                                                <div className={`${styles.content_card_secondary_2} p-2 `}>
                                                    <div className={styles.content_card_secondary_3}>
                                                        <img src={`data:image/png;base64, ${y.id_produk[0].gambar}`} alt={y.id_produk[0].nama} className={styles.product_picture} />
                                                        <div className='ms-xl-4 ms-lg-4 ms-md-4 ms-0'>
                                                            <H6 texttransform='uppercase'>{y.id_produk[0].nama}</H6>
                                                            <Subtitle fontsize='0.75rem'>{y.id_supplier[0].namaPerusahaan}</Subtitle>
                                                        </div>
                                                    </div>
                                                    <H5>{y.jumlah} PCS</H5>
                                                </div>
                                                <Divider margin='0.5rem 0' />
                                            </>
                                        );
                                    })}
                                <div className='text-center p-4'>
                                    <Link className='link-dark' to='/barang-retur'>
                                        Lihat Semua
                                    </Link>
                                </div>
                            </DashboardCardSecondary>
                        )}
                    </div>
                </div>
            </MainCard>
        </div>
    );
};

export default Dashboard;
