import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { url } from "../../../api";
import styles from "../style.module.css";

import { HiOutlineTrash } from "react-icons/hi";

import BtnLinkError from "../../../components/button/link/error";
import BtnPrimary from "../../../components/button/primary";
import BtnSecondary from "../../../components/button/secondary";
import InputNumber from "../../../components/form/number";
import InputSelect from "../../../components/form/select";
import Textarea from "../../../components/form/textarea";
import Spinner from "../../../components/spinner";
import LinkSpan from "../../../components/typography/link";
import Subtitle from "../../../components/typography/subtitle";
import Title from "../../../components/typography/title";

const EditBarangRetur = () => {
    const navigate = useNavigate();
    const id = useLocation().state.id;

    const [dataBarangRetur, setDataBarangRetur] = useState({
        status: null,
        alasan: null,
        catatan: null,
        jumlah: null,
        id_produk: "",
        id_supplier: "",
    });

    const [produk, setProduk] = useState(null);
    const [supplier, setSupplier] = useState(null);

    const getInfoDataBarangRetur = (id) => {
        url.get(`${id}`)
            .then((response) => {
                setDataBarangRetur({
                    status: response.data[0].status,
                    alasan: response.data[0].alasan,
                    catatan: response.data[0].catatan,
                    jumlah: response.data[0].jumlah,
                    id_produk: response.data[0].id_produk[0]._id,
                    id_supplier: response.data[0].id_supplier[0]._id,
                });
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const getProduk = () => {
        url.get("/produk")
            .then((response) => {
                setProduk(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const getSupplier = () => {
        url.get("/supplier")
            .then((response) => {
                setSupplier(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const patchBarangRetur = (id) => {
        url.patch(`${id}`, dataBarangRetur)
            .then((response) => {})
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => {
                setTimeout(() => {
                    navigate("/barang-retur");
                }, 100);
            });
    };

    const handleClear = () => {
        document.getElementById("selectProdukRetur").selectedIndex = 0;
        document.getElementById("inputJumlahRetur").value = 0;
        document.getElementById("selectSupplierRetur").selectedIndex = 0;
        document.getElementById("inputAlasanRetur").value = "";
        document.getElementById("inputCatatanRetur").value = "";
        document.getElementById("selectStatusRetur").selectedIndex = 0;
        setDataBarangRetur({
            status: "",
            alasan: "",
            catatan: "",
            jumlah: 0,
            id_produk: "",
            id_supplier: "",
        });
    };

    const handleBackToPrevious = () => {
        navigate(-1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        patchBarangRetur(id);
    };

    useEffect(() => {
        getInfoDataBarangRetur(id);
        getProduk();
        getSupplier();
    }, []);

    const dataStatus = [
        { key: 1, nama: "Diterima" },
        { key: 2, nama: "Diproses" },
        { key: 3, nama: "Ditolak" },
    ];

    return (
        <form onSubmit={handleSubmit} id="formInputBarangRetur">
            <div className="mt-1 mb-5">
                <div className="row">
                    <div className="col">
                        <label htmlFor="selectProdukRetur">
                            <Title margin="1rem 0 0.625rem 0.25rem">Produk</Title>
                        </label>
                        <InputSelect id="selectProdukRetur" data={produk} value={dataBarangRetur.id_produk} onChange={(e) => setDataBarangRetur({ ...dataBarangRetur, id_produk: e.target.value })} />
                        <Subtitle fontsize="0.75rem" margin="0 0 0 0.25rem">
                            *Jika produk tidak ditemukan, maka pergi ke halaman 'Produk' atau klik{" "}
                            <LinkSpan fontsize="0.75rem" to="/produk/tambah-produk">
                                disini
                            </LinkSpan>
                        </Subtitle>
                    </div>
                    <div className="col">
                        <label htmlFor="inputJumlahRetur">
                            <Title margin="1rem 0 0.625rem 0.25rem">Jumlah barang</Title>
                        </label>
                        <InputNumber id="inputJumlahRetur" defaultValue={dataBarangRetur.jumlah} onChange={(e) => setDataBarangRetur({ ...dataBarangRetur, jumlah: e.target.value })} />
                    </div>
                    <div className="col">
                        <label htmlFor="selectSupplierRetur">
                            <Title margin="1rem 0 0.625rem 0.25rem">Supplier</Title>
                        </label>
                        <select
                            id="selectSupplierRetur"
                            className={`${styles.input_select} form-select`}
                            aria-label="Default select example"
                            value={dataBarangRetur.id_supplier}
                            onChange={(e) => setDataBarangRetur({ ...dataBarangRetur, id_supplier: e.target.value })}
                        >
                            <option hidden value=""></option>
                            {supplier === null ? (
                                <Spinner />
                            ) : (
                                supplier.map((x) => {
                                    return (
                                        <option key={x._id} value={x._id}>
                                            {x.nama} - {x.namaPerusahaan}
                                        </option>
                                    );
                                })
                            )}
                        </select>
                        <Subtitle fontsize="0.75rem" margin="0 0 0 0.25rem">
                            *Jika supplier tidak ditemukan, maka pergi ke halaman 'Supplier' atau klik{" "}
                            <LinkSpan fontsize="0.75rem" to="/supplier/tambah-supplier">
                                disini
                            </LinkSpan>
                        </Subtitle>
                    </div>
                </div>

                <label htmlFor="inputAlasanRetur">
                    <Title margin="1rem 0 0.625rem 0.25rem">Alasan melakukan retur</Title>
                </label>
                <Textarea id="inputAlasanRetur" defaultValue={dataBarangRetur.alasan} onChange={(e) => setDataBarangRetur({ ...dataBarangRetur, alasan: e.target.value })} rows={8} />

                <label htmlFor="inputCatatanRetur">
                    <Title margin="1rem 0 0.625rem 0.25rem">Catatan</Title>
                </label>
                <Textarea id="inputCatatanRetur" defaultValue={dataBarangRetur.catatan} onChange={(e) => setDataBarangRetur({ ...dataBarangRetur, catatan: e.target.value })} rows={8} />

                <label htmlFor="selectStatusRetur">
                    <Title margin="1rem 0 0.625rem 0.25rem">Status barang retur</Title>
                </label>
                <select
                    id="selectStatusRetur"
                    className={`${styles.input_select} form-select`}
                    aria-label="Default select example"
                    value={dataBarangRetur.status}
                    onChange={(e) => setDataBarangRetur({ ...dataBarangRetur, status: e.target.value })}
                >
                    <option hidden value=""></option>
                    {dataStatus === null ? (
                        <Spinner />
                    ) : (
                        dataStatus.map((x) => {
                            return (
                                <option key={x._id} value={x.nama}>
                                    {x.nama}
                                </option>
                            );
                        })
                    )}
                </select>
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

export default EditBarangRetur;
