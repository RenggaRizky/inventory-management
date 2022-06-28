import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { url } from "../../../api";
import styles from "../style.module.css";

import { MdOutlineInventory } from "react-icons/md";

import BtnSecondary from "../../../components/button/secondary";
import Spinner from "../../../components/spinner";
import { H2, H3 } from "../../../components/typography/heading";
import Overline from "../../../components/typography/overline";
import Subtitle from "../../../components/typography/subtitle";

const DetailStok = () => {
    const navigate = useNavigate();
    const getId = useLocation().pathname.split("/")[2];
    const [dataStok, setDataStok] = useState({
        nama: null,
        gambar: null,
        stok: null,
        jumlahMasuk: null,
        jumlahKeluar: null,
        jumlahRetur: null,
        batasMinimum: null,
        statusStok: null,
        id_satuanbarang: null,
    });

    const getInfoStok = (id) => {
        url.get(`${id}`)
            .then((response) => {
                setDataStok({
                    nama: response.data[0].nama,
                    gambar: response.data[0].gambar,
                    stok: response.data[0].stok.total,
                    id_satuanbarang: response.data[0].id_satuanbarang[0].nama,
                    jumlahMasuk: Number(response.data[0].stok.jumlahMasuk),
                    jumlahKeluar: Number(response.data[0].stok.jumlahKeluar),
                    jumlahRetur: Number(response.data[0].stok.jumlahRetur),
                    batasMinimum: Number(response.data[0].stok.batasMinimum),
                    statusStok: response.data[0].stok.statusStok,
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
        getInfoStok(getId);
    }, [getId]);
    return (
        <>
            {dataStok.nama === null ? (
                <Spinner />
            ) : (
                <div className="my-2">
                    <div className="card mb-4">
                        <div className="card-header p-4 mb-1">
                            <div className="d-flex align-items-center">
                                <div className={`${styles.icon_product_wrapper} me-4`}>
                                    <MdOutlineInventory className={styles.icon_product} />
                                </div>
                                <div>
                                    <H2 bs="text-uppercase">{dataStok.nama}</H2>
                                    <Subtitle>{dataStok.statusStok}</Subtitle>
                                </div>
                            </div>
                        </div>

                        <div className="card-body p-4 mb-5">
                            <div className="row">
                                <div className="col-5">
                                    <div className="mb-3">
                                        <Overline>Nama Produk</Overline>
                                        <H3>{dataStok.nama}</H3>
                                    </div>
                                    <div className="mb-3">
                                        <Overline>Stok</Overline>
                                        <H3>{`${dataStok.stok} ${dataStok.id_satuanbarang}`}</H3>
                                    </div>
                                    <div className="mb-3">
                                        <Overline>Jumlah Masuk</Overline>
                                        <H3>{`${dataStok.jumlahMasuk} ${dataStok.id_satuanbarang}`}</H3>
                                    </div>
                                    <div className="mb-3">
                                        <Overline>Jumlah Keluar</Overline>
                                        <H3>{`${dataStok.jumlahKeluar} ${dataStok.id_satuanbarang}`}</H3>
                                    </div>
                                    <div className="mb-3">
                                        <Overline>Jumlah Retur</Overline>
                                        <H3>{`${dataStok.jumlahRetur} ${dataStok.id_satuanbarang}`}</H3>
                                    </div>
                                    <div className="mb-3">
                                        <Overline>Batas Minimum Stok</Overline>
                                        <H3>{`${dataStok.batasMinimum} ${dataStok.id_satuanbarang}`}</H3>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="mb-3">
                                        <Overline>Gambar Produk</Overline>
                                        <img src={`data:image/png;base64, ${dataStok.gambar}`} alt={dataStok.nama} className={styles.product_picture} />
                                    </div>
                                    <div className="mb-3">
                                        <Overline>Status Stok</Overline>
                                        <H3>{dataStok.statusStok}</H3>
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

export default DetailStok;
