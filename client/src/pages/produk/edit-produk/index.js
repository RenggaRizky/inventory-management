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
import LinkSpan from "../../../components/typography/link";
import InputDataList from "../../../components/form/datalist";
import Textarea from "../../../components/form/textarea";
import InputFile from "../../../components/form/file";

const EditProduk = () => {
    const navigate = useNavigate();
    const id = useLocation().state.id;
    const [dataProduk, setDataProduk] = useState({
        nama: null,
        deskripsi: null,
        id_jenibarang: "",
        id_merek: "",
        harga: null,
        panjang: null,
        lebar: null,
        tinggi: null,
        volume: null,
    });

    const [gambarBase64, setGambarBase64] = useState("");
    const [infoGambarBase64, setInfoGambarBase64] = useState("");
    const [jenisBarang, setJenisBarang] = useState(null);
    const [merek, setMerek] = useState(null);

    const getInfoProduk = (id) => {
        url.get(`${id}`)
            .then((response) => {
                setDataProduk({
                    nama: response.data[0].nama,
                    gambar: gambarBase64,
                    deskripsi: response.data[0].deskripsi,
                    id_jenibarang: response.data[0].id_jenisbarang[0]._id,
                    id_merek: response.data[0].id_merek[0]._id,
                    harga: Number(response.data[0].harga),
                    panjang: Number(response.data[0].dimensi.panjang.$numberDecimal),
                    lebar: Number(response.data[0].dimensi.lebar.$numberDecimal),
                    tinggi: Number(response.data[0].dimensi.tinggi.$numberDecimal),
                    volume: Number(response.data[0].volume.$numberDecimal),
                });
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

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
            deskripsi: dataProduk.deskripsi,
            id_jenisbarang: dataProduk.id_jenibarang,
            id_merek: dataProduk.id_merek,
            harga: Number(dataProduk.harga),
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
        document.getElementById("inputGambarProduk").value = "";
        document.getElementById("inputDeskripsiProduk").value = "";
        document.getElementById("SelectIdJenisBarang").selectedIndex = 0;
        document.getElementById("SelectIdMerek").selectedIndex = 0;
        document.getElementById("inputHargaProduk").value = 0;
        document.getElementById("inputPanjangProduk").value = 0;
        document.getElementById("inputLebarProduk").value = 0;
        document.getElementById("inputTinggiProduk").value = 0;
        document.getElementById("inputVolumeProduk").value = 0;
        setDataProduk({
            nama: "",
            deskripsi: "-",
            id_jenibarang: "",
            id_merek: "",
            harga: 0,
            panjang: 0,
            lebar: 0,
            tinggi: 0,
            volume: 0,
        });
        setGambarBase64("");
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
    }, []);

    const fileToBase64 = (e, setFile, setFileName) => {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            var inputData = reader.result;
            var replaceValue = inputData.split(",")[0];
            var base64String = inputData.replace(replaceValue + ",", "");
            setFile(base64String);
            setFileName(file.name);
        };
    };

    const setFilesName = (e, setFileName) => {
        var file = e.target.files[0];
        setFileName(file.name);
    };

    const volumeProduk = dataProduk.panjang * dataProduk.lebar * dataProduk.tinggi;

    return (
        <form onSubmit={handleSubmit} id="formInputProduk">
            <div className="mt-1 mb-5">
                <label htmlFor="inputNamaProduk">
                    <Title margin="2rem 0 0.625rem 0.25rem">Nama Produk</Title>
                </label>
                <InputText id="inputNamaProduk" defaultValue={dataProduk.nama} onChange={(e) => setDataProduk({ ...dataProduk, nama: e.target.value })} maxLength={50} required />

                <label htmlFor="inputGambarProduk">
                    <Title margin="2rem 0 0.625rem 0.25rem">Gambar Produk</Title>
                </label>
                <InputFile
                    id="inputGambarProduk"
                    onChange={(e) => {
                        fileToBase64(e, setGambarBase64, setInfoGambarBase64);
                        setFilesName(e, setGambarBase64);
                    }}
                    accept="image/*"
                />
                {/* <FileBase type="file" multiple={false} onDone={({ base64 }) => setDataProduk({ ...dataProduk, gambar: base64 })} /> */}
                <div className="row">
                    <div className="col">
                        <label htmlFor="SelectIdJenisBarang">
                            <Title margin="2rem 0 0.625rem 0.25rem">Jenis Barang</Title>
                        </label>
                        <InputSelect id="SelectIdJenisBarang" value={dataProduk.id_jenibarang} data={jenisBarang} onChange={(e) => setDataProduk({ ...dataProduk, id_jenibarang: e.target.value })} required />
                        <Subtitle fontsize="0.75rem" margin="0 0 0 0.25rem">
                            *Jika jenis barang tidak ditemukan, maka pergi ke halaman 'Jenis Barang' atau klik{" "}
                            <LinkSpan fontsize="0.75rem" to="/jenis-barang/tambah-jenis-barang">
                                disini
                            </LinkSpan>
                        </Subtitle>
                    </div>

                    <div className="col">
                        <label htmlFor="SelectIdMerek">
                            <Title margin="2rem 0 0.625rem 0.25rem">Merek</Title>
                        </label>
                        <InputSelect id="SelectIdMerek" value={dataProduk.id_merek} data={merek} onChange={(e) => setDataProduk({ ...dataProduk, id_merek: e.target.value })} required />
                        <Subtitle fontsize="0.75rem" margin="0 0 0 0.25rem">
                            *Jika merek tidak ditemukan, maka pergi ke halaman 'Merek' atau klik{" "}
                            <LinkSpan fontsize="0.75rem" to="/merek/tambah-merek">
                                disini
                            </LinkSpan>
                        </Subtitle>
                    </div>
                </div>

                <label htmlFor="inputHargaProduk">
                    <Title margin="2rem 0 0.625rem 0.25rem">Harga </Title>
                </label>
                <InputGroupFront type="number" min="0" max="9999999" step="500" wrap="Rp" id="inputHargaProduk" defaultValue={dataProduk.harga} onChange={(e) => setDataProduk({ ...dataProduk, harga: e.target.value })} required />

                <label htmlFor="inputDeskripsiProduk">
                    <Title margin="2rem 0 0.625rem 0.25rem">Deskripsi</Title>
                </label>
                <Textarea id="inputDeskripsiProduk" defaultValue={dataProduk.deskripsi} onChange={(e) => setDataProduk({ ...dataProduk, deskripsi: e.target.value })} rows={8} />

                <div className="row">
                    <div className="col me-2">
                        <label htmlFor="inputPanjangProduk">
                            <Title margin="2rem 0 0.625rem 0.25rem">Panjang Produk</Title>
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
                    <div className="col me-2">
                        <label htmlFor="inputLebarProduk">
                            <Title margin="2rem 0 0.625rem 0.25rem">Lebar Produk</Title>
                        </label>
                        <InputGroupBack type="number" min="0" max="999999" step="any" wrap="cm" id="inputLebarProduk" defaultValue={dataProduk.lebar} onChange={(e) => setDataProduk({ ...dataProduk, lebar: e.target.value })} required />
                    </div>
                    <div className="col">
                        <label htmlFor="inputTinggiProduk">
                            <Title margin="2rem 0 0.625rem 0.25rem">Tinggi Produk</Title>
                        </label>
                        <InputGroupBack type="number" min="0" max="999999" step="any" wrap="cm" id="inputTinggiProduk" defaultValue={dataProduk.tinggi} onChange={(e) => setDataProduk({ ...dataProduk, tinggi: e.target.value })} required />
                    </div>
                </div>
                <label htmlFor="inputVolumeProduk">
                    <Title margin="2rem 0 0.625rem 0.25rem">Volume</Title>
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
