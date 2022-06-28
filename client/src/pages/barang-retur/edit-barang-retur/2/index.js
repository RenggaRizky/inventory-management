import React, { useEffect, useState } from "react";
import styles from "../../style.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { url } from "../../../../api";

import { HiOutlineTrash } from "react-icons/hi";

import BtnLinkError from "../../../../components/button/link/error";
import BtnPrimary from "../../../../components/button/primary";
import BtnSecondary from "../../../../components/button/secondary";
import InputNumber from "../../../../components/form/number";
import Textarea from "../../../../components/form/textarea";
import Spinner from "../../../../components/spinner";
import { H2 } from "../../../../components/typography/heading";
import { Title } from "../../../../components/typography/title";
import DisableForm from "../../../../components/form/disable";
import P from "../../../../components/typography/paragraph";

const EditBarangRetur2 = () => {
    const location = useLocation();
    const idProduk = location.state.id_produk;
    const idSupplier = location.state.id_supplier;
    const idBarangRetur = location.state.id_barangRetur;
    const navigate = useNavigate();

    const [dataBarangRetur, setDataBarangRetur] = useState({
        status: null,
        alasan: null,
        catatan: "-",
        jumlah: null,
    });

    const [produk, setProduk] = useState(null);

    const getInfoDataBarangRetur = (id) => {
        url.get(`/barang-retur/${id}`)
            .then((response) => {
                setDataBarangRetur({
                    status: response.data[0].status,
                    alasan: response.data[0].alasan,
                    catatan: response.data[0].catatan,
                    jumlah: response.data[0].jumlah,
                });
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

    const patchStokProsesRetur = (id) => {
        url.patch(`/stok-barang/proses-retur/${id}`, {
            stok: {
                total: dataBarangRetur.status === "Diterima" ? Number(produk[0].stok.total) + Number(dataBarangRetur.jumlah) : Number(produk[0].stok.total),
                jumlahRetur: dataBarangRetur.status === "Diproses" ? Number(produk[0].stok.jumlahRetur) : Number(produk[0].stok.jumlahRetur) - Number(dataBarangRetur.jumlah),
            },
        })
            .then((response) => {})
            .catch((error) => {
                console.log(error.message);
            });
    };

    const getInfoProduk = (id) => {
        url.get(`/produk/${id}`)
            .then((response) => {
                setProduk(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const handleClear = () => {
        document.getElementById("inputAlasanRetur").value = "";
        document.getElementById("inputCatatanRetur").value = "";
        document.getElementById("selectStatusRetur").selectedIndex = 0;
        setDataBarangRetur({
            status: null,
            alasan: null,
            catatan: "-",
        });
    };

    const handleBackToPrevious = () => {
        navigate(-1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        patchBarangRetur(idBarangRetur);
        patchStokProsesRetur(idProduk);
    };

    useEffect(() => {
        getInfoDataBarangRetur(idBarangRetur);
        getInfoProduk(idProduk);
    }, []);

    const dataStatus = [
        { key: 1, nama: "Diterima", detail: "Diterima ( diganti dengan barang yang sejenis )" },
        { key: 2, nama: "Diterima", detail: "Diterima ( diganti dengan uang )" },
        { key: 3, nama: "Ditolak", detail: "Ditolak" },
        { key: 4, nama: "Diproses", detail: "Diproses" },
    ];

    console.log(produk);
    return (
        <>
            {produk === null ? (
                <Spinner />
            ) : (
                <form onSubmit={handleSubmit} id="inputBarangRetur2">
                    <div className="p-5">
                        <H2>2. Isi Keterangan Retur Barang</H2>
                        <label htmlFor="DisableinputJumlahRetur">
                            <Title margin="2rem 0 0.625rem 0.25rem">Jumlah retur</Title>
                        </label>
                        <DisableForm id="DisableinputJumlahRetur" defaultValue={dataBarangRetur.jumlah} required />
                        <label htmlFor="inputAlasanRetur">
                            <Title margin="2rem 0 0.625rem 0.25rem">Alasan melakukan retur</Title>
                        </label>
                        <Textarea id="inputAlasanRetur" defaultValue={dataBarangRetur.alasan} onChange={(e) => setDataBarangRetur({ ...dataBarangRetur, alasan: e.target.value })} rows={8} required />

                        <label htmlFor="inputCatatanRetur">
                            <Title margin="2rem 0 0.625rem 0.25rem">Catatan</Title>
                        </label>
                        <Textarea id="inputCatatanRetur" defaultValue={dataBarangRetur.catatan} onChange={(e) => setDataBarangRetur({ ...dataBarangRetur, catatan: e.target.value })} rows={8} />

                        <label htmlFor="selectStatusRetur">
                            <Title margin="2rem 0 0.625rem 0.25rem">Status barang retur</Title>
                        </label>
                        <select
                            id="selectStatusRetur"
                            className={`${styles.input_select} form-select`}
                            aria-label="Default select example"
                            defaultValue={dataBarangRetur.status}
                            onChange={(e) => setDataBarangRetur({ ...dataBarangRetur, status: e.target.value })}
                        >
                            <option hidden value=""></option>
                            {dataStatus === null ? (
                                <Spinner />
                            ) : (
                                dataStatus.map((x) => {
                                    return (
                                        <option key={x._id} value={x.nama}>
                                            {x.detail}
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
                            <BtnPrimary type="submit" value="Simpan"></BtnPrimary>
                        </div>
                    </div>
                </form>
            )}
        </>
    );
};

export default EditBarangRetur2;
