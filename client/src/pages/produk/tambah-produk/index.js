import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../../../api";
import FileBase from "react-file-base64";
import styles from "../style.module.css";

import { HiOutlineTrash } from "react-icons/hi";

import BtnLinkError from "../../../components/button/link/error";
import BtnPrimary from "../../../components/button/primary";
import BtnSecondary from "../../../components/button/secondary";
import { InputGroupBack, InputGroupBackDisabled, InputGroupFront } from "../../../components/form/input-group";
import { InputSelect } from "../../../components/form/select";
import InputText from "../../../components/form/text";
import Subtitle from "../../../components/typography/subtitle";
import { Title } from "../../../components/typography/title";
import InputFile from "../../../components/form/file";
import Textarea from "../../../components/form/textarea";
import LinkSpan from "../../../components/typography/link";
import InputNumber from "../../../components/form/number";
import { H2 } from "../../../components/typography/heading";
import Divider from "../../../components/divider";

const TambahProduk = () => {
    const navigate = useNavigate();

    const [dataProduk, setDataProduk] = useState({
        nama: null,
        deskripsi: "-",
        id_jenibarang: "",
        id_merek: "",
        id_satuanbarang: "",
        harga: null,
        stokAwal: null,
        jumlahMasuk: 0,
        jumlahKeluar: 0,
        jumlahRetur: 0,
        batasMinimum: null,
        statusStok: null,
        panjang: null,
        lebar: null,
        tinggi: null,
        volume: 0,
    });

    const [gambarBase64, setGambarBase64] = useState("");
    const [infoGambarBase64, setInfoGambarBase64] = useState("");

    const [jenisBarang, setJenisBarang] = useState(null);
    const [merek, setMerek] = useState(null);
    const [satuanbarang, setSatuanBarang] = useState(null);

    const postProduk = () => {
        url.post("tambah-produk", {
            nama: dataProduk.nama,
            gambar: gambarBase64,
            deskripsi: dataProduk.deskripsi,
            id_jenisbarang: dataProduk.id_jenibarang,
            id_merek: dataProduk.id_merek,
            id_satuanbarang: dataProduk.id_satuanbarang,
            stok: {
                jumlahMasuk: 0,
                jumlahKeluar: 0,
                jumlahRetur: 0,
                statusStok: setStatusStok(),
                total: Number(dataProduk.stokAwal),
                batasMinimum: Number(dataProduk.batasMinimum),
            },
            harga: Number(dataProduk.harga),
            dimensi: {
                panjang: Number(dataProduk.panjang),
                lebar: Number(dataProduk.lebar),
                tinggi: Number(dataProduk.tinggi),
            },
            volume: Number(volumeProduk.toFixed(1)),
        })
            .then((response) => {
                // console.log(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => {
                setTimeout(() => {
                    handleClear();
                    navigate("/produk");
                }, 100);
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

    const getSatuanBarang = () => {
        url.get("/satuan-barang")
            .then((response) => {
                setSatuanBarang(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const handleClear = () => {
        document.getElementById("inputNamaProduk").value = "";
        document.getElementById("inputGambarProduk").value = "";
        document.getElementById("inputDeskripsiProduk").value = "";
        document.getElementById("SelectIdJenisBarang").selectedIndex = 0;
        document.getElementById("SelectIdMerek").selectedIndex = 0;
        document.getElementById("SelectIdSatuanBarang").selectedIndex = 0;
        document.getElementById("inputHargaProduk").value = "";
        document.getElementById("inputStokAwalProduk").value = "";
        document.getElementById("inputBatasMinimumProduk").value = "";
        document.getElementById("inputPanjangProduk").value = "";
        document.getElementById("inputLebarProduk").value = "";
        document.getElementById("inputTinggiProduk").value = "";
        document.getElementById("inputVolumeProduk").value = "";
        setDataProduk({
            nama: "",
            deskripsi: "-",
            id_jenibarang: "",
            id_merek: "",
            id_satuanbarang: "",
            harga: "",
            stokAwal: "",
            batasMinimum: "",
            panjang: "",
            lebar: "",
            tinggi: "",
            volume: 0,
        });
        setGambarBase64("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postProduk();
    };

    const handleBackToPrevious = () => {
        handleClear();
        navigate(-1);
    };

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

    useEffect(() => {
        getJenisBarang();
        getMerek();
        getSatuanBarang();
    }, []);

    const volumeProduk = dataProduk.panjang * dataProduk.lebar * dataProduk.tinggi;
    const setStatusStok = () => (Number(dataProduk.stokAwal) === 0 ? "Habis" : dataProduk.stokAwal >= dataProduk.batasMinimum ? "Tersedia" : "Hampir Habis");

    return (
        <form onSubmit={handleSubmit} id="formInputProduk">
            <div className="p-5">
                <H2>1. Informasi Produk</H2>
                <label htmlFor="inputNamaProduk">
                    <Title margin="2rem 0 0.625rem 0.25rem">Nama Produk</Title>
                </label>
                <InputText id="inputNamaProduk" defaultValue={dataProduk.nama} onChange={(e) => setDataProduk({ ...dataProduk, nama: e.target.value })} maxLength={100} required />

                <label htmlFor="inputGambarProduk">
                    <Title margin="2rem 0 0.625rem 0.25rem">Gambar Produk</Title>
                </label>
                <InputFile
                    id="inputGambarProduk"
                    onChange={(e) => {
                        fileToBase64(e, setGambarBase64, setInfoGambarBase64);
                        setFilesName(e, setInfoGambarBase64);
                    }}
                    accept="image/*"
                />

                {/* <FileBase type="file" multiple={false} onDone={({ base64 }) => setDataProduk({ ...dataProduk, gambar: base64 })} /> */}

                <div className="row">
                    <div className="col">
                        <label htmlFor="SelectIdJenisBarang">
                            <Title margin="2rem 0 0.625rem 0.25rem">Jenis Barang</Title>
                        </label>
                        <InputSelect id="SelectIdJenisBarang" defaultValue={dataProduk.id_jenibarang} data={jenisBarang} onChange={(e) => setDataProduk({ ...dataProduk, id_jenibarang: e.target.value })} required />
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
                        <InputSelect id="SelectIdMerek" defaultValue={dataProduk.id_merek} data={merek} onChange={(e) => setDataProduk({ ...dataProduk, id_merek: e.target.value })} required />
                        <Subtitle fontsize="0.75rem" margin="0 0 0 0.25rem">
                            *Jika merek tidak ditemukan, maka pergi ke halaman 'Merek' atau klik{" "}
                            <LinkSpan fontsize="0.75rem" to="/merek/tambah-merek">
                                disini
                            </LinkSpan>
                        </Subtitle>
                    </div>

                    <div className="col">
                        <label htmlFor="SelectIdSatuanBarang">
                            <Title margin="2rem 0 0.625rem 0.25rem">Satuan Barang</Title>
                        </label>
                        <InputSelect id="SelectIdSatuanBarang" defaultValue={dataProduk.id_satuanbarang} data={satuanbarang} onChange={(e) => setDataProduk({ ...dataProduk, id_satuanbarang: e.target.value })} required />
                        <Subtitle fontsize="0.75rem" margin="0 0 0 0.25rem">
                            *Jika satuan barang tidak ditemukan, maka pergi ke halaman 'Satuan Barang' atau klik{" "}
                            <LinkSpan fontsize="0.75rem" to="/satuan-barang/tambah-satuan-barang">
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

                <Divider margin="4rem 0 0 0" bordercolor="#fff" />
            </div>

            <div className="p-5">
                <H2>2. Pengaturan Stok Produk</H2>

                <div className="mt-1 mb-5">
                    <div className="row">
                        <div className="col">
                            <label htmlFor="inputStokAwalProduk">
                                <Title margin="2rem 0 0.625rem 0.25rem">Stok Awal</Title>
                            </label>
                            <InputNumber id="inputStokAwalProduk" min="0" max="999999" defaultValue={dataProduk.stokAwal} onChange={(e) => setDataProduk({ ...dataProduk, stokAwal: e.target.value })} required />
                            <Subtitle fontsize="0.75rem" margin="0 0 0 0.25rem">
                                *Data stok awal akan muncul di halaman 'Stok Barang'
                            </Subtitle>
                        </div>
                        <div className="col">
                            <label htmlFor="inputBatasMinimumProduk">
                                <Title margin="2rem 0 0.625rem 0.25rem">Batas Minimum Stok</Title>
                            </label>
                            <InputNumber id="inputBatasMinimumProduk" min="0" max="999999" defaultValue={dataProduk.batasMinimum} onChange={(e) => setDataProduk({ ...dataProduk, batasMinimum: e.target.value })} required />
                            <Subtitle fontsize="0.75rem" margin="0 0 0 0.25rem">
                                *Data batas minimum stok akan muncul di halaman 'Stok Barang'
                            </Subtitle>
                        </div>
                    </div>
                </div>

                <Divider margin="4rem 0 0 0" bordercolor="#fff" />
            </div>

            <div className="p-5">
                <H2>3. Dimensi Produk</H2>
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
    );
};

export default TambahProduk;

// Satuan barang, stok awal, batas stok minimum masih dummy
