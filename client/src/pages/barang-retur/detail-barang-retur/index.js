import React, { useEffect, useState } from "react";
import styles from "../style.module.css";
import moment from "moment";
import "moment/locale/id";

import { MdOutlineInventory } from "react-icons/md";

import { H2, H3 } from "../../../components/typography/heading";
import Subtitle from "../../../components/typography/subtitle";
import { url } from "../../../api";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import Overline from "../../../components/typography/overline";
import BtnSecondary from "../../../components/button/secondary";
import Spinner from "../../../components/spinner";
import BtnPrimary from "../../../components/button/primary";
import { ErrorAlert } from "../../../components/alert";
import P from "../../../components/typography/paragraph";

const DetailBarangRetur = () => {
    const navigate = useNavigate();
    const getId = useLocation().pathname.split("/")[2];
    const [user, setUser, responseErrorMessage, setResponseErrorMessage] = useOutletContext();
    const [dataBarangRetur, setDataBarangRetur] = useState({
        status: "",
        alasan: "",
        catatan: "",
        jumlah: 0,
        namaProduk: "",
        gambarProduk: "",
        namaSupplier: "",
        namaPerusahaanSupplier: "",
        tanggalPengembalian: "",
    });

    const getInfoDataBarangRetur = (id) => {
        url.get(`${id}`)
            .then((response) => {
                setDataBarangRetur({
                    status: response.data[0].status,
                    alasan: response.data[0].alasan,
                    catatan: response.data[0].catatan,
                    jumlah: response.data[0].jumlah,
                    namaProduk: response.data[0].id_produk[0].nama,
                    gambarProduk: response.data[0].id_produk[0].gambar,
                    namaSupplier: response.data[0].id_supplier[0].nama,
                    namaPerusahaanSupplier: response.data[0].id_supplier[0].namaPerusahaan,
                    tanggalPengembalian: response.data[0].tanggalPengembalian,
                });
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const patchMasukanReturKeRak = (id) => {
        url.patch(`/barang-retur/masuk-retur-ke-rak/${id}`)
            .then((response) => {
                if (response.status !== 404 || response.status !== 409 || response.status !== 403 || response.status !== 500) {
                    setTimeout(() => {
                        navigate("/barang-retur");
                    }, 50);
                }
            })
            .catch((error) => {
                setResponseErrorMessage(error.response.data);
            });
    };

    const handleBackToPrevious = () => {
        navigate(-1);
    };

    useEffect(() => {
        getInfoDataBarangRetur(getId);
    }, [getId]);

    return (
        <>
            {dataBarangRetur.status === "" ? (
                <Spinner />
            ) : (
                <>
                    <div className="my-2">
                        <div className="card mb-5">
                            <div className="card-header p-4 mb-1">
                                <div className="d-flex align-items-center">
                                    <div className={`${styles.icon_return_product_wrapper} me-4`}>
                                        <MdOutlineInventory className={styles.icon_return_product} />
                                    </div>
                                    <div>
                                        <H2 bs="text-uppercase">{dataBarangRetur.namaProduk}</H2>
                                        <Subtitle>{dataBarangRetur.status}</Subtitle>
                                    </div>
                                </div>
                            </div>

                            <div className="card-body p-4 mb-5">
                                <div className="row">
                                    <div className="col-12 col-xxl-5 col-xl-5 col-lg-5 col-md-12">
                                        <div className="mb-3">
                                            <Overline>Nama Produk</Overline>
                                            <H3>{dataBarangRetur.namaProduk}</H3>
                                        </div>
                                        <div className="mb-3">
                                            <Overline>Nama Supplier</Overline>
                                            <H3>{`${dataBarangRetur.namaSupplier} dari ${dataBarangRetur.namaPerusahaanSupplier}`}</H3>
                                        </div>
                                        <div className="mb-3">
                                            <Overline>Tanggal Pengembalian</Overline>
                                            <H3>{moment(dataBarangRetur.tanggalPengembalian).format("LLLL")}</H3>
                                        </div>
                                        <div className="mb-3">
                                            <Overline>Jumlah yang di retur</Overline>
                                            <H3>{dataBarangRetur.jumlah}</H3>
                                        </div>
                                        <div className="mb-3">
                                            <Overline>Alasan melakukan retur</Overline>
                                            <H3>{dataBarangRetur.alasan}</H3>
                                        </div>
                                        <div className="mb-3">
                                            <Overline>Catatan</Overline>
                                            <H3>{dataBarangRetur.catatan}</H3>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="mb-3">
                                            <Overline>Gambar Produk</Overline>
                                            <img src={`data:image/png;base64, ${dataBarangRetur.gambarProduk}`} alt={dataBarangRetur.namaProduk} className={styles.product_picture} />
                                        </div>
                                        <div className="mb-3">
                                            <Overline>Status barang retur</Overline>
                                            {(dataBarangRetur.status === "Diterima Ganti Barang" || dataBarangRetur.status === "Diterima Ganti Uang") && <H3>Diterima</H3>}
                                            {dataBarangRetur.status === "Ditolak" && <H3>Ditolak</H3>}
                                            {dataBarangRetur.status === "Diproses" && <H3>Diproses</H3>}
                                            {dataBarangRetur.status === "Belum Bisa Masuk Rak (Kapasitas rak sudah penuh)" && <H3>Belum Bisa Masuk Rak (Kapasitas rak sudah penuh)</H3>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.btn_secondary_wrapper}>
                            <BtnSecondary type="button" onClick={handleBackToPrevious}>
                                Kembali
                            </BtnSecondary>
                            {dataBarangRetur.status === "Belum Bisa Masuk Rak (Kapasitas rak sudah penuh)" && (
                                <BtnPrimary type="button" bs="ms-3" onClick={() => patchMasukanReturKeRak(getId)}>
                                    Masukan Ke Rak
                                </BtnPrimary>
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default DetailBarangRetur;
