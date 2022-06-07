import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { url } from "../../../api";
import styles from "../style.module.css";

import { HiOutlineTrash } from "react-icons/hi";

import BtnLinkError from "../../../components/button/link/error";
import BtnPrimary from "../../../components/button/primary";
import BtnSecondary from "../../../components/button/secondary";
import { InputGroupBack, InputGroupBackDisabled, InputGroupFront } from "../../../components/form/input-group";
import InputSelect from "../../../components/form/select";
import InputText from "../../../components/form/text";
import Subtitle from "../../../components/typography/subtitle";
import Title from "../../../components/typography/title";

const EditProduk = () => {
    const navigate = useNavigate();
    const id = useLocation().state.id;
    const [dataProduk, setDataProduk] = useState({
        nama: "",
        id_jenibarang: "",
        id_merek: "",
        hargaSatuan: "",
        hargaPerLusin: "",
        panjang: "",
        lebar: "",
        tinggi: "",
        volume: "",
    });

    const [jenisBarang, setJenisBarang] = useState(null);
    const [merek, setMerek] = useState(null);

    const getInfoProduk = (id) => {
        url.get(`${id}`)
            .then((response) => {
                setDataProduk({
                    nama: response.data.nama,
                    id_jenibarang: response.data.id_jenisbarang,
                    id_merek: response.data.id_merek,
                    hargaSatuan: Number(response.data.harga.hargaSatuan),
                    hargaPerLusin: Number(response.data.harga.hargaPerLusin),
                    panjang: Number(response.data.dimensi.panjang.$numberDecimal),
                    lebar: Number(response.data.dimensi.lebar.$numberDecimal),
                    tinggi: Number(response.data.dimensi.tinggi.$numberDecimal),
                    volume: Number(response.data.volume.$numberDecimal),
                });
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    console.log(dataProduk);

    const getJenisBarang = () => {
        url.get("/jenis-barang")
            .then((response) => {
                setJenisBarang(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const getMerek = () => {
        url.get("/merek")
            .then((response) => {
                setMerek(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const patchProduk = (id) => {
        url.patch(`${id}`, {
            nama: dataProduk.nama,
            id_jenisbarang: dataProduk.id_jenibarang,
            id_merek: dataProduk.id_merek,
            harga: {
                hargaSatuan: Number(dataProduk.hargaSatuan),
                hargaPerLusin: Number(dataProduk.hargaPerLusin),
            },
            dimensi: {
                panjang: Number(dataProduk.panjang),
                lebar: Number(dataProduk.lebar),
                tinggi: Number(dataProduk.tinggi),
            },
            volume: Number(volumeProduk),
        })
            .then((response) => {})
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => {
                setTimeout(() => {
                    navigate("/produk");
                }, 100);
            });
    };

    const handleClear = () => {
        document.getElementById("inputNamaProduk").value = "";
        document.getElementById("SelectIdJenisBarang").selectedIndex = 0;
        document.getElementById("SelectIdMerek").selectedIndex = 0;
        document.getElementById("inputHargaSatuanProduk").value = 0;
        document.getElementById("inputHargaPerLusinProduk").value = 0;
        document.getElementById("inputPanjangProduk").value = 0;
        document.getElementById("inputLebarProduk").value = 0;
        document.getElementById("inputTinggiProduk").value = 0;
        document.getElementById("inputVolumeProduk").value = 0;
        setDataProduk({
            nama: "",
            id_jenibarang: "",
            id_merek: "",
            hargaSatuan: 0,
            hargaPerlusin: 0,
            panjang: 0,
            lebar: 0,
            tinggi: 0,
            volume: 0,
        });
    };

    const handleBackToPrevious = () => {
        navigate("/produk");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        patchProduk(id);
    };

    useEffect(() => {
        getInfoProduk(id);
        getJenisBarang();
        getMerek();
    }, [id]);

    const volumeProduk = dataProduk.panjang * dataProduk.lebar * dataProduk.tinggi;

    return (
        <form onSubmit={handleSubmit} id="formInputProduk">
            <div className="mt-1 mb-5">
                <label htmlFor="inputNamaProduk">
                    <Title margin="1rem 0 0.25rem 0.25rem">Nama Produk</Title>
                </label>
                <InputText id="inputNamaProduk" defaultValue={dataProduk.nama} onChange={(e) => setDataProduk({ ...dataProduk, nama: e.target.value })} maxLength={50} required />

                <label htmlFor="SelectIdJenisBarang">
                    <Title margin="1rem 0 0.25rem 0.25rem">Jenis Barang</Title>
                </label>
                <InputSelect id="SelectIdJenisBarang" data={jenisBarang} value={dataProduk.id_jenibarang} onChange={(e) => setDataProduk({ ...dataProduk, id_jenibarang: e.target.value })} required />
                <Subtitle fontsize="0.75rem" margin="0 0 0 0.25rem">
                    *Jika jenis barang yang ingin dipilih tidak ditemukan, maka pergi ke halaman 'Jenis Barang' di bagian 'Produk'
                </Subtitle>
                <label htmlFor="SelectIdMerek">
                    <Title margin="1rem 0 0.25rem 0.25rem">Merek</Title>
                </label>
                <InputSelect id="SelectIdMerek" data={merek} value={dataProduk.id_merek} onChange={(e) => setDataProduk({ ...dataProduk, id_merek: e.target.value })} required />
                <Subtitle fontsize="0.75rem" margin="0 0 0 0.25rem">
                    *Jika merek yang ingin dipilih tidak ditemukan, maka pergi ke halaman 'Merek' di bagian 'Produk'
                </Subtitle>

                <div className="d-flex w-100">
                    <div className="w-100 me-3">
                        <label htmlFor="inputHargaSatuanProduk">
                            <Title margin="1rem 0 0.25rem 0.25rem">Harga Satuan</Title>
                        </label>
                        <InputGroupFront
                            type="number"
                            min="0"
                            max="9999999"
                            step="500"
                            wrap="Rp"
                            id="inputHargaSatuanProduk"
                            defaultValue={dataProduk.hargaSatuan}
                            onChange={(e) => setDataProduk({ ...dataProduk, hargaSatuan: e.target.value })}
                            required
                        />
                    </div>
                    <div className="w-100 ms-3">
                        <label htmlFor="inputHargaPerLusinProduk">
                            <Title margin="1rem 0 0.25rem 0.25rem">Harga Per Lusin</Title>
                        </label>
                        <InputGroupFront
                            type="number"
                            min="0"
                            max="9999999"
                            step="500"
                            wrap="Rp"
                            id="inputHargaPerLusinProduk"
                            defaultValue={dataProduk.hargaPerLusin}
                            onChange={(e) => setDataProduk({ ...dataProduk, hargaPerLusin: e.target.value })}
                            required
                        />
                    </div>
                </div>

                <div className="d-flex w-100 justify-content-between">
                    <div className="w-100 me-3">
                        <label htmlFor="inputPanjangProduk">
                            <Title margin="1.75rem 0 0.25rem 0.25rem">Panjang Produk</Title>
                        </label>
                        <InputGroupBack
                            type="number"
                            min="0"
                            max="999999"
                            step="any"
                            wrap="cm"
                            id="inputPanjangProduk"
                            defaultValue={dataProduk.panjang}
                            onChange={(e) => setDataProduk({ ...dataProduk, panjang: e.target.value })}
                            required
                        />
                    </div>
                    <div className="w-100 me-3">
                        <label htmlFor="inputLebarProduk">
                            <Title margin="1.75rem 0 0.25rem 0.25rem">Lebar Produk</Title>
                        </label>
                        <InputGroupBack type="number" min="0" max="999999" step="any" wrap="cm" id="inputLebarProduk" defaultValue={dataProduk.lebar} onChange={(e) => setDataProduk({ ...dataProduk, lebar: e.target.value })} required />
                    </div>
                    <div className="w-100">
                        <label htmlFor="inputTinggiProduk">
                            <Title margin="1.75rem 0 0.25rem 0.25rem">Tinggi Produk</Title>
                        </label>
                        <InputGroupBack type="number" min="0" max="999999" step="any" wrap="cm" id="inputTinggiProduk" defaultValue={dataProduk.tinggi} onChange={(e) => setDataProduk({ ...dataProduk, tinggi: e.target.value })} required />
                    </div>
                </div>
                <label htmlFor="inputVolumeProduk">
                    <Title margin="1.75rem 0 0.25rem 0.25rem">Volume</Title>
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
                    id="inputVolumeProduk"
                    value={volumeProduk}
                />
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
    );
};

export default EditProduk;
