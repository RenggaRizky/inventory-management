import React, { useState, useEffect } from "react";
import { url } from "../../../../api";
import styles from "./style.module.css";
import { colors } from "../../../../colors";

import { IoMdAdd } from "react-icons/io";
import { HiOutlinePencilAlt } from "react-icons/hi";

import { H3, H6 } from "../../../typography/heading";
import Title from "../../../typography/title";
import InputText from "../../../form/text";
import BtnSecondary from "../../secondary";
import InputSelect from "../../../form/select";
import Subtitle from "../../../typography/subtitle";
import { InputGroupBack, InputGroupBackDisabled, InputGroupFront } from "../../../form/input-group";
import BtnPrimarySubmit from "../../primary/submit";

const ModalProduk = ({ produk, setproduk, currentid, setcurrentid, ...props }) => {
    const [dataProduk, setDataProduk] = useState({
        nama: "",
        id_jenibarang: "",
        id_merek: "",
        hargaSatuan: 0,
        hargaPerLusin: 0,
        panjang: 0,
        lebar: 0,
        tinggi: 0,
        volume: 0,
    });

    const [jenisBarang, setJenisBarang] = useState(null);
    const [merek, setMerek] = useState(null);

    const postProduk = () => {
        url.post("produk", {
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
            volume: volumeProduk,
        })
            .then((response) => {
                setproduk(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => {
                setTimeout(() => {
                    handleCloseModal();
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
                    handleClear();
                }, 100);
            });
    };

    const getJenisBarang = () => {
        url.get("jenis-barang")
            .then((response) => {
                setJenisBarang(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const getMerek = () => {
        url.get("merek")
            .then((response) => {
                setMerek(response.data);
            })
            .catch((error) => {
                console.log(error.message);
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
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postProduk();
    };

    const handleCloseModal = () => {
        document.getElementById("closeModalAddEditProduk").click();
    };

    useEffect(() => {
        getJenisBarang();
        getMerek();
    }, []);

    const volumeProduk = dataProduk.panjang * dataProduk.lebar * dataProduk.tinggi;

    return (
        <>
            {props.type === "add" ? (
                <button type="button" className={`${styles.btn_modal_add} btn`} data-bs-toggle="modal" data-bs-target={`#${props.target}`}>
                    <IoMdAdd className={styles.icon_add} />
                    {props.value} Produk
                </button>
            ) : (
                <button type="button" className={`${styles.btn_modal_edit} btn text-uppercase d-flex`} data-bs-toggle="modal" data-bs-target={`#${props.target}`} onClick={setcurrentid}>
                    <HiOutlinePencilAlt className={styles.icon_edit} />
                    <H6 color={colors.success}>{props.value}</H6>
                </button>
            )}
            <div className={`${styles.modal} modal fade`} id={props.target} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg modal-fullscreen-lg-down">
                    <div className="modal-content">
                        <div className={`${styles.modal_header} modal-header`}>
                            <H3 className="modal-title text-uppercase" id="staticBackdropLabel">
                                {props.value} Produk
                            </H3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalAddEditProduk" onClick={handleClear}></button>
                        </div>
                        <div className={`${styles.modal_body} modal-body`}>
                            <form onSubmit={handleSubmit} id="formInputProduk" className="mt-1 mb-5">
                                <label htmlFor="inputNamaProduk">
                                    <Title margin="1rem 0 0.25rem 0.25rem">Nama Produk</Title>
                                </label>
                                <InputText id="inputNamaProduk" defaultValue={dataProduk.nama} onChange={(e) => setDataProduk({ ...dataProduk, nama: e.target.value })} maxLength={50} required />
                                <label htmlFor="SelectIdJenisBarang">
                                    <Title margin="1rem 0 0.25rem 0.25rem">Jenis Barang</Title>
                                </label>
                                <InputSelect id="SelectIdJenisBarang" data={jenisBarang} onChange={(e) => setDataProduk({ ...dataProduk, id_jenibarang: e.target.value })} required />
                                <Subtitle fontsize="0.75rem" margin="0 0 0 0.25rem">
                                    *Jika jenis barang yang ingin dipilih tidak ditemukan, maka pergi ke halaman 'Jenis Barang' di bagian 'Produk'
                                </Subtitle>
                                <label htmlFor="SelectIdMerek">
                                    <Title margin="1rem 0 0.25rem 0.25rem">Merek</Title>
                                </label>
                                <InputSelect id="SelectIdMerek" data={merek} onChange={(e) => setDataProduk({ ...dataProduk, id_merek: e.target.value })} required />
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
                                        <InputGroupBack
                                            type="number"
                                            min="0"
                                            max="999999"
                                            step="any"
                                            wrap="cm"
                                            id="inputLebarProduk"
                                            defaultValue={dataProduk.lebar}
                                            onChange={(e) => setDataProduk({ ...dataProduk, lebar: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="w-100">
                                        <label htmlFor="inputTinggiProduk">
                                            <Title margin="1.75rem 0 0.25rem 0.25rem">Tinggi Produk</Title>
                                        </label>
                                        <InputGroupBack
                                            type="number"
                                            min="0"
                                            max="999999"
                                            step="any"
                                            wrap="cm"
                                            id="inputTinggiProduk"
                                            defaultValue={dataProduk.tinggi}
                                            onChange={(e) => setDataProduk({ ...dataProduk, tinggi: e.target.value })}
                                            required
                                        />
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
                            </form>
                        </div>
                        <div className={`${styles.modal_footer} modal-footer`}>
                            <BtnSecondary type="button" data-bs-dismiss="modal" onClick={handleClear}>
                                Batal
                            </BtnSecondary>
                            <BtnPrimarySubmit form="formInputProduk">Simpan</BtnPrimarySubmit>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalProduk;
