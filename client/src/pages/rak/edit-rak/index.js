import React, { useEffect, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import { url } from "../../../api";
import { BtnLinkError } from "../../../components/button/link/error";
import BtnPrimary from "../../../components/button/primary";
import BtnSecondary from "../../../components/button/secondary";
import MainCard from "../../../components/card/main";
import Divider from "../../../components/divider";
import { InputGroupBack, InputGroupBackDisabled } from "../../../components/form/input-group";
import InputText from "../../../components/form/text";
import Spinner from "../../../components/spinner";
import { H2 } from "../../../components/typography/heading";
import { Title } from "../../../components/typography/title";
import HeadContent from "../../../layouts/head-content";
import styles from "../style.module.css";

const EditRak = () => {
    const navigate = useNavigate();
    const id = useLocation().state.id;
    const [dataRak, setDataRak] = useState({
        nama: null,
        lokasi: null,
        panjang: null,
        lebar: null,
        tinggi: null,
        kapasitas: null,
    });

    const getInfoRak = (id) => {
        url.get(`/rak/${id}`)
            .then((response) => {
                setDataRak({
                    nama: response.data.nama,
                    lokasi: response.data.lokasi,
                    panjang: response.data.dimensiSusun.panjang.$numberDecimal,
                    lebar: response.data.dimensiSusun.lebar.$numberDecimal,
                    tinggi: response.data.dimensiSusun.tinggi.$numberDecimal,
                    kapasitas: response.data.susun1.kapasitas.$numberDecimal,
                });
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const patchRak = (id) => {
        url.patch(`/rak/${id}`, dataRak)
            .then((response) => {})
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => {
                setTimeout(() => {
                    navigate(`/rak/${id}`);
                }, 100);
            });
    };

    const kapasitasSusun = dataRak.panjang * dataRak.lebar * dataRak.tinggi;

    const handleSubmit = (e) => {
        e.preventDefault();
        patchRak(id);
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

    useEffect(() => {
        getInfoRak(id);
    }, [id]);

    return (
        <>
            {dataRak.nama === null ? (
                <Spinner />
            ) : (
                <div className={styles.wrapper}>
                    <MainCard>
                        <HeadContent title="Edit Rak" subtitle="Perbarui data rak yang dapat dipakai untuk menyimpan barang" />
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
                                        <InputGroupBack
                                            type="number"
                                            min="0"
                                            max="999999"
                                            step="any"
                                            wrap="cm"
                                            id="inputPanjangSusun"
                                            defaultValue={dataRak.panjang}
                                            onChange={(e) => setDataRak({ ...dataRak, panjang: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="col me-2">
                                        <label htmlFor="inputLebarSusun">
                                            <Title margin="2rem 0 0.625rem 0.25rem">Lebar Susun</Title>
                                        </label>
                                        <InputGroupBack
                                            type="number"
                                            min="0"
                                            max="999999"
                                            step="any"
                                            wrap="cm"
                                            id="inputLebarSusun"
                                            defaultValue={dataRak.lebar}
                                            onChange={(e) => setDataRak({ ...dataRak, lebar: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="inputTinggiSusun">
                                            <Title margin="2rem 0 0.625rem 0.25rem">Tinggi Susun</Title>
                                        </label>
                                        <InputGroupBack
                                            type="number"
                                            min="0"
                                            max="999999"
                                            step="any"
                                            wrap="cm"
                                            id="inputTinggiSusun"
                                            defaultValue={dataRak.tinggi}
                                            onChange={(e) => setDataRak({ ...dataRak, tinggi: e.target.value })}
                                            required
                                        />
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
            )}
        </>
    );
};

export default EditRak;
