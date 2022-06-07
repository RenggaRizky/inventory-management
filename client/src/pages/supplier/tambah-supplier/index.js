import React, { useState } from "react";
import styles from "../style.module.css";
import { url } from "../../../api";
import { useNavigate } from "react-router-dom";

import { HiOutlineTrash } from "react-icons/hi";

import InputText from "../../../components/form/text";
import Title from "../../../components/typography/title";
import InputTel from "../../../components/form/tel";
import Textarea from "../../../components/form/textarea";
import BtnSecondary from "../../../components/button/secondary";
import BtnPrimary from "../../../components/button/primary";
import BtnLinkError from "../../../components/button/link/error";

const TambahSupplier = () => {
    const navigate = useNavigate();
    const [dataSupplier, setDataSupplier] = useState({
        nama: "",
        kontak: "",
        alamat: "",
    });

    const postSupplier = () => {
        url.post("tambah-supplier", dataSupplier)
            .then((response) => {})
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => {
                setTimeout(() => {
                    handleClear();
                    navigate("/supplier");
                }, 50);
            });
    };

    const handleClear = () => {
        document.getElementById("inputNamaSupplier").value = "";
        document.getElementById("inputKontakSupplier").value = "";
        document.getElementById("inputAlamatSupplier").value = "";
        setDataSupplier({ nama: "", kontak: "", alamat: "" });
    };

    const handleBackToPrevious = () => {
        handleClear();
        navigate("/supplier");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postSupplier();
    };

    return (
        <form onSubmit={handleSubmit} id="formInputSupplier">
            <div className="mt-1 mb-5">
                <label htmlFor="inputNamaSupplier">
                    <Title margin="0.875rem 0 0.625rem 0.25rem">Nama Supplier</Title>
                </label>
                <InputText id="inputNamaSupplier" defaultValue={dataSupplier.nama} onChange={(e) => setDataSupplier({ ...dataSupplier, nama: e.target.value })} maxLength={50} required />
                <label htmlFor="inputKontakSupplier">
                    <Title margin="0.875rem 0 0.625rem 0.25rem">Kontak</Title>
                </label>
                <InputTel id="inputKontakSupplier" defaultValue={dataSupplier.kontak} onChange={(e) => setDataSupplier({ ...dataSupplier, kontak: e.target.value })} maxLength={12} required />
                <label htmlFor="inputAlamatSupplier">
                    <Title margin="0.875rem 0 0.625rem 0.25rem">Alamat</Title>
                </label>
                <Textarea id="inputAlamatSupplier" defaultValue={dataSupplier.alamat} onChange={(e) => setDataSupplier({ ...dataSupplier, alamat: e.target.value })} rows={8} required />
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

export default TambahSupplier;
