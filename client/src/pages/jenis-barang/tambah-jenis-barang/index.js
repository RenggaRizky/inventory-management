import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../../../api";
import styles from "../style.module.css";

import { HiOutlineTrash } from "react-icons/hi";

import BtnPrimary from "../../../components/button/primary";
import BtnSecondary from "../../../components/button/secondary";
import InputText from "../../../components/form/text";
import Title from "../../../components/typography/title";
import BtnLinkError from "../../../components/button/link/error";

const TambahJenisBarang = () => {
    const navigate = useNavigate();

    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const [dataJenisBarang, setDataJenisBarang] = useState({
        nama: "",
    });

    const postJenisBarang = () => {
        url.post("tambah-jenis-barang", {
            nama: capitalize(dataJenisBarang.nama),
        })
            .then((response) => {})
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => {
                setTimeout(() => {
                    handleClear();
                    navigate("/jenis-barang");
                }, 50);
            });
    };

    const handleClear = () => {
        document.getElementById("inputJenisBarang").value = "";
        setDataJenisBarang({ nama: "" });
    };

    const handleBackToPrevious = () => {
        handleClear();
        navigate(-1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postJenisBarang();
    };

    return (
        <form onSubmit={handleSubmit} id="formInputJenisBarang">
            <div className="mt-1 mb-5">
                <label htmlFor="inputJenisBarang">
                    <Title margin="0.875rem 0 0.625rem 0.25rem">Nama Jenis Barang</Title>
                </label>
                <InputText id="inputJenisBarang" defaultValue={dataJenisBarang.nama} onChange={(e) => setDataJenisBarang({ ...dataJenisBarang, nama: e.target.value })} maxLength={30} required />
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

export default TambahJenisBarang;
