import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import BtnPrimary from "../../components/button/primary";
import MainCard from "../../components/card/main";
import Divider from "../../components/divider";
import { H3 } from "../../components/typography/heading";
import Subtitle from "../../components/typography/subtitle";
import HeadContent from "../../layouts/head-content";
import styles from "./style.module.css";
import moment from "moment";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { url } from "../../api";
import Spinner from "../../components/spinner";
import HeaderReport from "../../components/laporan/header";
import InputDate from "../../components/form/date";
import P from "../../components/typography/paragraph";

const Laporan = () => {
    const [user, setUser] = useState(localStorage.getItem("profile") !== null ? JSON.parse(localStorage.getItem("profile")) : null);

    const [stok, setStok] = useState(null);
    const [laporanBarangMasuk, setLaporanBarangMasuk] = useState(null);
    const [laporanBarangKeluar, setLaporanBarangKeluar] = useState(null);
    const [laporanBarangRetur, setLaporanBarangRetur] = useState(null);

    const [startDateLaporanBarangMasuk, setStartDateLaporanBarangMasuk] = useState(null);
    const [endDateLaporanBarangMasuk, setEndDateLaporanBarangMasuk] = useState(null);
    const [startDateLaporanBarangKeluar, setStartDateLaporanBarangKeluar] = useState(null);
    const [endDateLaporanBarangKeluar, setEndDateLaporanBarangKeluar] = useState(null);
    const [startDateLaporanBarangRetur, setStartDateLaporanBarangRetur] = useState(null);
    const [endDateLaporanBarangRetur, setEndDateLaporanBarangRetur] = useState(null);

    const getStok = () => {
        url.get("/stok-barang")
            .then((response) => {
                setStok(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const postLaporanBarangMasuk = (id, title) => {
        url.post("/barang-masuk/laporan", {
            tanggalMulai: startDateLaporanBarangMasuk,
            tanggalSelesai: endDateLaporanBarangMasuk,
        })
            .then((response) => {
                setLaporanBarangMasuk(response.data);
                exportPDF(id, title);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const postLaporanBarangKeluar = (id, title) => {
        url.post("/barang-keluar/laporan", {
            tanggalMulai: startDateLaporanBarangKeluar,
            tanggalSelesai: endDateLaporanBarangKeluar,
        })
            .then((response) => {
                setLaporanBarangKeluar(response.data);
                exportPDF(id, title);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const postLaporanBarangRetur = (id, title) => {
        url.post("/barang-retur/laporan", {
            tanggalMulai: startDateLaporanBarangRetur,
            tanggalSelesai: endDateLaporanBarangRetur,
        })
            .then((response) => {
                setLaporanBarangRetur(response.data);
                exportPDF(id, title);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const tableHeadStok = [
        { key: 1, title: "Produk" },
        { key: 2, title: "Stok" },
        // {
        //     key: 3,
        //     title: "Batas Minimum",
        // },
        { key: 3, title: "Rak" },
        { key: 4, title: "Status" },
    ];

    const tableHeadBarangKeluarMasuk = [
        { key: 1, title: "Tanggal" },
        { key: 2, title: "Produk" },
        {
            key: 3,
            title: "Jumlah",
        },
    ];

    const tableHeadBarangRetur = [
        { key: 1, title: "Tanggal" },
        { key: 2, title: "Produk" },
        { key: 3, title: "Supplier" },
        { key: 4, title: "Jumlah" },
        { key: 5, title: "Status" },
        { key: 6, title: "Alasan" },
    ];

    const exportPDF = (id, title) => {
        const pdf = document.getElementById(id);
        html2canvas(pdf, { logging: true, letterRendering: 1, useCORS: true }).then((canvas) => {
            const imgWidth = 208;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            const imgData = canvas.toDataURL("img/png");
            const generatePDF = new jsPDF("p", "mm", "a4");
            generatePDF.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
            generatePDF.save(`${title}.pdf`);
        });
    };

    const linkDownload = [
        {
            id: 1,
            title: "Stok Barang",
            subtitle: "Kumpulan data mengenai stok barang yang disajikan dalam bentuk laporan dengan format .pdf",
            link: () => exportPDF("laporanStokBarang", "Laporan Stok Barang"),
            startdate: null,
            setstartdate: null,
            enddate: null,
            setenddate: null,
        },
        {
            id: 2,
            title: "Barang Masuk",
            subtitle: "Kumpulan data mengenai barang masuk yang disajikan dalam bentuk laporan dengan format .pdf",
            link: () => postLaporanBarangMasuk("laporanBarangMasuk", "Laporan Barang Masuk"),
            startdate: startDateLaporanBarangMasuk,
            setstartdate: setStartDateLaporanBarangMasuk,
            enddate: endDateLaporanBarangMasuk,
            setenddate: setEndDateLaporanBarangMasuk,
        },
        {
            id: 3,
            title: "Barang Keluar",
            subtitle: "Kumpulan data mengenai barang keluar yang disajikan dalam bentuk laporan dengan format .pdf",
            link: () => postLaporanBarangKeluar("laporanBarangKeluar", "Laporan Barang Keluar"),
            startdate: startDateLaporanBarangKeluar,
            setstartdate: setStartDateLaporanBarangKeluar,
            enddate: endDateLaporanBarangKeluar,
            setenddate: setEndDateLaporanBarangKeluar,
        },
        {
            id: 4,
            title: "Barang Retur",
            subtitle: "Kumpulan data mengenai barang retur yang disajikan dalam bentuk laporan dengan format .pdf",
            link: () => postLaporanBarangRetur("laporanBarangRetur", "Laporan Barang Retur"),
            startdate: startDateLaporanBarangRetur,
            setstartdate: setStartDateLaporanBarangRetur,
            enddate: endDateLaporanBarangRetur,
            setenddate: setEndDateLaporanBarangRetur,
        },
    ];

    useEffect(() => {
        getStok();
    }, []);

    if (user === null) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className={styles.wrapper}>
            <MainCard>
                <HeadContent title="Laporan" subtitle="Kumpulan laporan yang bisa diunduh setiap saat" />
                <Divider margin="0 0 24px 0" />
                <div className="row">
                    {linkDownload.map((x) => {
                        return (
                            <div className="col-lg-6 mb-5 " key={x.id}>
                                <div className="card h-100 shadow-sm">
                                    <div className={x.title !== "Stok Barang" ? `card-body p-5 p-md-4 p-xs-2 d-flex flex-column` : `card-body p-5 p-md-4 p-xs-2 d-flex flex-column justify-content-between`}>
                                        {x.title !== "Stok Barang" && (
                                            <>
                                                <H3 margin="0 0 0.75rem 0" className="card-title">
                                                    {x.title}
                                                </H3>
                                                <Subtitle margin="0 0 1rem 0" className="card-text">
                                                    {x.subtitle}
                                                </Subtitle>
                                            </>
                                        )}
                                        {x.title === "Stok Barang" && (
                                            <div>
                                                <H3 margin="0 0 0.75rem 0" className="card-title">
                                                    {x.title}
                                                </H3>
                                                <Subtitle margin="0 0 1rem 0" className="card-text">
                                                    {x.subtitle}
                                                </Subtitle>
                                            </div>
                                        )}
                                        {x.title !== "Stok Barang" && (
                                            <div className="d-flex w-100 mb-4 justify-content-between align-items-center row gx-lg-3 gx-sm-1 ">
                                                <div className="d-flex flex-column  col col-sm-6">
                                                    <label className="mb-0 mb-xs-5">
                                                        <Subtitle margin="0 0 0 0.25rem" fontsize="0.75rem">
                                                            Dari
                                                        </Subtitle>
                                                    </label>
                                                    <InputDate setDefaultValue={x.startdate} onChange={(e) => x.setstartdate(e.target.value)} />
                                                </div>

                                                <div className="d-flex flex-column  col col-sm-6">
                                                    <label>
                                                        <Subtitle margin="0 0 0 0.25rem" fontsize="0.75rem">
                                                            Sampai
                                                        </Subtitle>
                                                    </label>
                                                    <InputDate setDefaultValue={x.enddate} onChange={(e) => x.setenddate(e.target.value)} />
                                                </div>
                                            </div>
                                        )}
                                        {x.title === "Stok Barang" ? (
                                            <div className="w-100">
                                                <BtnPrimary type="button" onClick={x.link} bs="w-100 align-self-end">
                                                    Download
                                                </BtnPrimary>
                                            </div>
                                        ) : (
                                            <BtnPrimary type="button" onClick={x.link} bs="w-100" disabled={x.startdate === null || x.enddate === null}>
                                                Download
                                            </BtnPrimary>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* LAPORAN STOK BARANG */}
                <div className={`${styles.hidden} p-5`} id="laporanStokBarang">
                    {stok === null ? (
                        <Spinner />
                    ) : (
                        <>
                            <HeaderReport title="Laporan Stok Barang" />
                            <table className={`${styles.table} table table-bordered`}>
                                <thead>
                                    <tr>
                                        {tableHeadStok.map((x) => {
                                            return (
                                                <th scope="col" key={x.key} className="text-uppercase">
                                                    {x.title}
                                                </th>
                                            );
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {stok.map((x) => {
                                        return (
                                            <tr key={x._id}>
                                                <td>{x.nama}</td>
                                                <td>{x.stok.total}</td>
                                                {/* <td>{x.stok.batasMinimum}</td> */}
                                                <td>
                                                    {x.id_rak[0].nama} {x.id_rak[0].lokasi} - {x.id_rak[0].susun.nama}
                                                </td>
                                                <td>{x.stok.status}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </>
                    )}
                </div>

                {/* LAPORAN BARANG MASUK */}
                <div className={`${styles.hidden} p-5`} id="laporanBarangMasuk">
                    {laporanBarangMasuk === null ? (
                        <Spinner />
                    ) : (
                        <>
                            <HeaderReport title="Laporan Barang Masuk" subtitle={`${moment(startDateLaporanBarangMasuk).format("L")}    sampai    ${moment(endDateLaporanBarangMasuk).format("L")}`} />
                            {laporanBarangMasuk.length === 0 && (
                                <div className="d-flex justify-content-center">
                                    <P>TIDAK ADA BARANG YANG MASUK</P>
                                </div>
                            )}
                            {laporanBarangMasuk.length !== 0 && (
                                <table className={`${styles.table} table table-bordered`}>
                                    <thead>
                                        <tr>
                                            {tableHeadBarangKeluarMasuk.map((x) => {
                                                return (
                                                    <th scope="col" key={x.key} className="text-uppercase">
                                                        {x.title}
                                                    </th>
                                                );
                                            })}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {laporanBarangMasuk.map((x) => {
                                            return (
                                                <>
                                                    {x.barangMasuk.map((y) => {
                                                        return (
                                                            <tr key={y._id}>
                                                                <td>{moment(y.tanggalMasuk).format("LLL")}</td>
                                                                <td>{y.id_produk.nama}</td>
                                                                <td>{y.jumlahMasuk}</td>
                                                            </tr>
                                                        );
                                                    })}
                                                </>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            )}
                        </>
                    )}
                </div>

                {/* LAPORAN BARANG KELUAR */}
                <div className={`${styles.hidden} p-5`} id="laporanBarangKeluar">
                    {laporanBarangKeluar === null ? (
                        <Spinner />
                    ) : (
                        <>
                            <HeaderReport title="Laporan Barang Keluar" subtitle={`${moment(startDateLaporanBarangKeluar).format("L")}    sampai    ${moment(endDateLaporanBarangKeluar).format("L")}`} />
                            {laporanBarangKeluar.length === 0 && (
                                <div className="d-flex justify-content-center">
                                    <P>TIDAK ADA BARANG YANG KELUAR</P>
                                </div>
                            )}
                            {laporanBarangKeluar.length !== 0 && (
                                <table className={`${styles.table} table table-bordered`}>
                                    <thead>
                                        <tr>
                                            {tableHeadBarangKeluarMasuk.map((x) => {
                                                return (
                                                    <th scope="col" key={x.key} className="text-uppercase">
                                                        {x.title}
                                                    </th>
                                                );
                                            })}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {laporanBarangKeluar.map((x) => {
                                            return (
                                                <>
                                                    {x.barangKeluar.map((y) => {
                                                        return (
                                                            <tr key={y._id}>
                                                                <td>{moment(y.tanggalKeluar).format("LLL")}</td>
                                                                <td>{y.id_produk.nama}</td>
                                                                <td>{y.jumlahKeluar}</td>
                                                            </tr>
                                                        );
                                                    })}
                                                </>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            )}
                        </>
                    )}
                </div>

                {/* LAPORAN BARANG RETUR */}
                <div className={`${styles.hidden} p-5`} id="laporanBarangRetur">
                    {laporanBarangRetur === null ? (
                        <Spinner />
                    ) : (
                        <>
                            <HeaderReport title="Laporan Barang Retur" subtitle={`${moment(startDateLaporanBarangRetur).format("L")}    sampai    ${moment(endDateLaporanBarangRetur).format("L")}`} />
                            {laporanBarangRetur.length === 0 && (
                                <div className="d-flex justify-content-center">
                                    <P>TIDAK ADA BARANG YANG DI RETUR</P>
                                </div>
                            )}
                            {laporanBarangRetur.length !== 0 && (
                                <table className={`${styles.table} table table-bordered`}>
                                    <thead>
                                        <tr>
                                            {tableHeadBarangRetur.map((x) => {
                                                return (
                                                    <th scope="col" key={x.key} className="text-uppercase">
                                                        {x.title}
                                                    </th>
                                                );
                                            })}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {laporanBarangRetur.map((x) => {
                                            return (
                                                <tr key={x._id}>
                                                    <td>{moment(x.tanggalPengembalian).format("LLL")}</td>
                                                    <td>{x.id_produk[0].nama}</td>
                                                    <td>
                                                        {x.id_supplier[0].nama} ({x.id_supplier[0].namaPerusahaan})
                                                    </td>
                                                    <td>{x.jumlah}</td>
                                                    <>{(x.status === "Diterima Ganti Barang" || x.status === "Diterima Ganti Uang") && <td>Diterima</td>}</>
                                                    <>{x.status === "Ditolak" && <td>Ditolak</td>}</>
                                                    <>{x.status === "Diproses" && <td>Diproses</td>}</>
                                                    <>{x.status === "Belum Bisa Masuk Rak (Kapasitas rak sudah penuh)" && <td>Diterima ( belum bisa masuk rak karena penuh)</td>}</>
                                                    <td>{x.alasan}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            )}
                        </>
                    )}
                </div>
            </MainCard>
        </div>
    );
};

export default Laporan;
