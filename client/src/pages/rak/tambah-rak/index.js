import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../style.module.css";

import { InputGroupBack, InputGroupBackDisabled } from "../../../components/form/input-group";
import InputText from "../../../components/form/text";
import { H2 } from "../../../components/typography/heading";
import { Title } from "../../../components/typography/title";
import BtnLinkError from "../../../components/button/link/error";
import { HiOutlineTrash } from "react-icons/hi";
import BtnSecondary from "../../../components/button/secondary";
import BtnPrimary from "../../../components/button/primary";
import Divider from "../../../components/divider";
import { url } from "../../../api";
import MainCard from "../../../components/card/main";
import HeadContent from "../../../layouts/head-content";

const TambahRak = () => {
    const navigate = useNavigate();

    const [dataRak, setDataRak] = useState({
        nama: null,
        lokasi: null,
        panjang: null,
        lebar: null,
        tinggi: null,
        kapasitas: null,
    });

    const postRak = () => {
        url.post("/rak/tambah-rak", {
            nama: dataRak.nama,
            lokasi: dataRak.lokasi,
            dimensiSusun: {
                panjang: Number(dataRak.panjang),
                lebar: Number(dataRak.lebar),
                tinggi: Number(dataRak.tinggi),
            },
            susun1: {
                kapasitas: Number(dataRak.kapasitas),
                terpakai: 0,
                status: 0,
            },
            susun2: {
                kapasitas: Number(dataRak.kapasitas),
                terpakai: 0,
                status: 0,
            },
            susun3: {
                kapasitas: Number(dataRak.kapasitas),
                terpakai: 0,
                status: 0,
            },
            susun4: {
                kapasitas: Number(dataRak.kapasitas),
                terpakai: 0,
                status: 0,
            },
        })
            .then((response) => {})
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => {
                setTimeout(() => {
                    handleClear();
                    navigate("/rak");
                });
            }, 100);
    };

    const kapasitasSusun = dataRak.panjang * dataRak.lebar * dataRak.tinggi;

    const handleSubmit = (e) => {
        e.preventDefault();
        postRak();
    };

    const handleClear = () => {
        document.getElementById("inputNamaRak").value = null;
        document.getElementById("inputLokasiRak").value = null;
        document.getElementById("inputPanjangSusun").value = null;
        document.getElementById("inputLebarSusun").value = null;
        document.getElementById("inputTinggiSusun").value = null;
        document.getElementById("inputVolumeSetiapSusun").value = null;
        setDataRak({
            nama: null,
            lokasi: null,
            panjang: null,
            lebar: null,
            tinggi: null,
            kapasitas: null,
        });
    };

    const handleBackToPrevious = () => {
        handleClear();
        navigate(-1);
    };

    return (
        <div className={styles.wrapper}>
            <MainCard>
                <HeadContent title="Tambah Rak" subtitle="Tambah data rak yang dapat dipakai untuk menyimpan barang" />
                <Divider margin="0 0 24px 0" />
                <form onSubmit={handleSubmit} id="formInputRak">
                    <div className="p-5">
                        <H2>1. Informasi Rak</H2>
                        <label htmlFor="inputNamaRak">
                            <Title margin="2rem 0 0.625rem 0.25rem">Nama Rak</Title>
                        </label>
                        <InputText id="inputNamaRak" defaultValue={dataRak.nama} onChange={(e) => setDataRak({ ...dataRak, nama: e.target.value })} maxLength={30} required />
                        <label htmlFor="inputLokasiRak">
                            <Title margin="0.875rem 0 0.625rem 0.25rem">Lokasi Rak</Title>
                        </label>
                        <InputText id="inputLokasiRak" defaultValue={dataRak.lokasi} onChange={(e) => setDataRak({ ...dataRak, lokasi: e.target.value })} maxLength={30} required />
                    </div>

                    <div className="p-5">
                        <H2>2. Dimensi Susun yang ada di Rak</H2>
                        <div className="row">
                            <div className="col me-2">
                                <label htmlFor="inputPanjangSusun">
                                    <Title margin="2rem 0 0.625rem 0.25rem">Panjang Susun</Title>
                                </label>
                                <InputGroupBack type="number" min="0" max="999999" step="any" wrap="cm" id="inputPanjangSusun" defaultValue={dataRak.panjang} onChange={(e) => setDataRak({ ...dataRak, panjang: e.target.value })} required />
                            </div>
                            <div className="col me-2">
                                <label htmlFor="inputLebarSusun">
                                    <Title margin="2rem 0 0.625rem 0.25rem">Lebar Susun</Title>
                                </label>
                                <InputGroupBack type="number" min="0" max="999999" step="any" wrap="cm" id="inputLebarSusun" defaultValue={dataRak.lebar} onChange={(e) => setDataRak({ ...dataRak, lebar: e.target.value })} required />
                            </div>
                            <div className="col">
                                <label htmlFor="inputTinggiSusun">
                                    <Title margin="2rem 0 0.625rem 0.25rem">Tinggi Susun</Title>
                                </label>
                                <InputGroupBack type="number" min="0" max="999999" step="any" wrap="cm" id="inputTinggiSusun" defaultValue={dataRak.tinggi} onChange={(e) => setDataRak({ ...dataRak, tinggi: e.target.value })} required />
                            </div>
                        </div>
                        <label htmlFor="inputVolumeSetiapSusun">
                            <Title margin="2rem 0 0.625rem 0.25rem">Volume Setiap Susun</Title>
                        </label>
                        <InputGroupBackDisabled
                            type="number"
                            min="0"
                            max="999999"
                            wrap={
                                <>
                                    cm<sup>3</sup>
                                </>
                            }
                            id="inputVolumeSetiapSusun"
                            value={kapasitasSusun}
                        />
                        <Divider margin="4rem 0 0 0" bordercolor="#fff" />
                    </div>

                    <div className={`${styles.form_footer} pt-5 d-flex justify-content-between`}>
                        <BtnLinkError bs="text-uppercase d-flex" onClick={handleClear}>
                            <HiOutlineTrash className={`${styles.icon_delete}`} />
                            Bersihkan
                        </BtnLinkError>
                        <div>
                            <BtnSecondary type="button" bs="me-3" onClick={handleBackToPrevious}>
                                Kembali
                            </BtnSecondary>
                            <BtnPrimary type="submit" value="Simpan" />
                        </div>
                    </div>
                </form>
            </MainCard>
        </div>
    );
};

export default TambahRak;
