import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../../../api";

import { HiOutlineTrash } from "react-icons/hi";

import BtnLinkError from "../../../components/button/link/error";
import BtnPrimary from "../../../components/button/primary";
import BtnSecondary from "../../../components/button/secondary";
import InputText from "../../../components/form/text";
import Title from "../../../components/typography/title";
import styles from "../style.module.css";

const TambahMerek = () => {
    const navigate = useNavigate();
    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const [dataMerek, setDataMerek] = useState({
        nama: "",
    });

    const postMerek = () => {
        url.post("tambah-merek", {
            nama: capitalize(dataMerek.nama),
        })
            .then((response) => {})
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => {
                setTimeout(() => {
                    handleClear();
                    navigate("/merek");
                }, 50);
            });
    };

    const handleClear = () => {
        document.getElementById("inputMerek").value = "";
        setDataMerek({ nama: "" });
    };

    const handleBackToPrevious = () => {
        handleClear();
        navigate("/merek");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postMerek();
    };

    return (
        <form onSubmit={handleSubmit} id="formInputMerek">
            <div className="mt-1 mb-5">
                <label htmlFor="inputMerek">
                    <Title margin="0.875rem 0 0.625rem 0.25rem">Nama Merek</Title>
                </label>
                <InputText id="inputMerek" defaultValue={dataMerek.nama} onChange={(e) => setDataMerek({ ...dataMerek, nama: e.target.value })} maxLength={30} required />
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

export default TambahMerek;
