import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { url } from "../../../api";
import styles from "../style.module.css";

import { FiBox } from "react-icons/fi";

import Spinner from "../../../components/spinner";
import { H2, H3 } from "../../../components/typography/heading";
import Subtitle from "../../../components/typography/subtitle";
import BtnSecondary from "../../../components/button/secondary";
import Overline from "../../../components/typography/overline";

const DetailProduk = () => {
    const navigate = useNavigate();
    const getId = useLocation().pathname.split("/")[2];
    const [dataProduk, setDataProduk] = useState({
        nama: "",
        deskripsi: "-",
        id_jenibarang: "",
        id_merek: "",
        // id_satuanbarang: "",
        harga: 0,
        panjang: 0,
        lebar: 0,
        tinggi: 0,
        volume: 0,
    });

    const [gambarBase64, setGambarBase64] = useState("");

    const getInfoProduk = (id) => {
        url.get(`${id}`)
            .then((response) => {
                setDataProduk({
                    nama: response.data[0].nama,
                    deskripsi: response.data[0].deskripsi,
                    id_jenibarang: response.data[0].id_jenisbarang[0].nama,
                    id_merek: response.data[0].id_merek[0].nama,
                    // id_satuanbarang: response.data[0].id_satuanbarang[0].nama,
                    harga: Number(response.data[0].harga),
                    panjang: Number(response.data[0].dimensiProduk.panjang.$numberDecimal),
                    lebar: Number(response.data[0].dimensiProduk.lebar.$numberDecimal),
                    tinggi: Number(response.data[0].dimensiProduk.tinggi.$numberDecimal),
                    volume: Number(response.data[0].volume.$numberDecimal),
                });
                setGambarBase64(response.data[0].gambar);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const handleBackToPrevious = () => {
        navigate(-1);
    };

    useEffect(() => {
        getInfoProduk(getId);
    }, [getId]);

    const numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const decimalNumber = (number) => {
        if (Number.isInteger(number)) {
            return parseFloat(number.toFixed(1).toString().replace(".", ","));
        } else {
            return number.toFixed(1).toString().replace(".", ",");
        }
    };

    return (
        <>
            {dataProduk.nama === "" ? (
                <Spinner />
            ) : (
                <div className="my-2">
                    <div className="card mb-4">
                        <div className="card-header p-4 mb-1">
                            <div className="d-flex align-items-center">
                                <div className={`${styles.icon_product_wrapper} me-4`}>
                                    <FiBox className={styles.icon_product} />
                                </div>
                                <div>
                                    <H2 bs="text-uppercase">{dataProduk.nama}</H2>
                                    <Subtitle>{`${numberWithCommas(decimalNumber(Number(dataProduk.panjang)))} x ${numberWithCommas(decimalNumber(Number(dataProduk.lebar)))} x ${numberWithCommas(
                                        decimalNumber(Number(dataProduk.tinggi))
                                    )}`}</Subtitle>
                                </div>
                            </div>
                        </div>

                        <div className="card-body p-4 mb-5">
                            <div className="row">
                                <div className="col-12 col-xxl-5 col-xl-5 col-lg-5 col-md-12">
                                    <div className="mb-3">
                                        <Overline>Nama Produk</Overline>
                                        <H3>{dataProduk.nama}</H3>
                                    </div>
                                    <div className="mb-3">
                                        <Overline>Jenis Barang</Overline>
                                        <H3>{dataProduk.id_jenibarang}</H3>
                                    </div>
                                    <div className="mb-3">
                                        <Overline>Merek</Overline>
                                        <H3>{dataProduk.id_merek}</H3>
                                    </div>
                                    {/* <div className="mb-3">
                                        <Overline>Satuan Barang</Overline>
                                        <H3>{dataProduk.id_satuanbarang}</H3>
                                    </div> */}
                                    <div className="mb-3">
                                        <Overline>Harga</Overline>
                                        <H3>Rp {numberWithCommas(dataProduk.harga)}</H3>
                                    </div>
                                    <div className="mb-3">
                                        <Overline>Dimensi</Overline>
                                        <H3>
                                            {`${numberWithCommas(decimalNumber(Number(dataProduk.panjang)))} cm x ${numberWithCommas(decimalNumber(Number(dataProduk.lebar)))} cm x ${numberWithCommas(
                                                decimalNumber(Number(dataProduk.tinggi))
                                            )} cm`}
                                        </H3>
                                    </div>
                                    <div className="mb-3">
                                        <Overline>Volume</Overline>
                                        <H3>
                                            {numberWithCommas(decimalNumber(Number(dataProduk.volume)))} cm<sup>3</sup>
                                        </H3>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="mb-3">
                                        <Overline>Gambar Produk</Overline>
                                        <img src={`data:image/png;base64, ${gambarBase64}`} alt={dataProduk.nama} className={styles.product_picture} />
                                    </div>
                                    <div className="mb-3">
                                        <Overline>Deskripsi</Overline>
                                        <H3>{dataProduk.deskripsi}</H3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-5">
                        <Subtitle fontsize="0.75rem">*Data stok awal akan muncul di halaman 'Stok Barang'</Subtitle>
                        <Subtitle fontsize="0.75rem">*Data batas minimum stok akan muncul di halaman 'Stok Barang'</Subtitle>
                        <Subtitle fontsize="0.75rem">*Data rak akan muncul di halaman 'Stok Barang'</Subtitle>
                    </div>
                    <div className={styles.btn_secondary_wrapper}>
                        <BtnSecondary type="button" onClick={handleBackToPrevious}>
                            Kembali
                        </BtnSecondary>
                    </div>
                </div>
            )}
        </>
    );
};

export default DetailProduk;
