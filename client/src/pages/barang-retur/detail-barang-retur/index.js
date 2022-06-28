import React, { useEffect, useState } from "react";
import styles from "../style.module.css";
import moment from "moment";
import "moment/locale/id";

import { MdOutlineInventory } from "react-icons/md";

import { H2, H3 } from "../../../components/typography/heading";
import Subtitle from "../../../components/typography/subtitle";
import { url } from "../../../api";
import { useLocation, useNavigate } from "react-router-dom";
import Overline from "../../../components/typography/overline";
import BtnSecondary from "../../../components/button/secondary";
import Spinner from "../../../components/spinner";

const DetailBarangRetur = () => {
    const navigate = useNavigate();
    const getId = useLocation().pathname.split("/")[2];
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
                                <div className="col-5">
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
                                        <H3>{dataBarangRetur.status}</H3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end">
                        <BtnSecondary type="button" onClick={handleBackToPrevious}>
                            Kembali
                        </BtnSecondary>
                    </div>
                </div>
            )}
        </>
    );
};

export default DetailBarangRetur;
