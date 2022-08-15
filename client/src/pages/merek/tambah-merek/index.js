import React, { useState } from "react";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
import { url } from "../../../api";

import { HiOutlineTrash } from "react-icons/hi";

import { BtnLinkError } from "../../../components/button/link/error";
import BtnPrimary from "../../../components/button/primary";
import BtnSecondary from "../../../components/button/secondary";
import InputText from "../../../components/form/text";
import { Title } from "../../../components/typography/title";
import styles from "../style.module.css";

const TambahMerek = () => {
    const navigate = useNavigate();
    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const [user, setUser] = useOutletContext();
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
        navigate(-1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postMerek();
    };

    if (user.user.peran === "Pemilik Toko") {
        return <Navigate to="/merek" replace />;
    }

    return (
        <form onSubmit={handleSubmit} id="formInputMerek">
            <div className="mt-1 mb-5">
                <label htmlFor="inputMerek">
                    <Title margin="0.875rem 0 0.625rem 0.25rem">Nama Merek</Title>
                </label>
                <InputText id="inputMerek" defaultValue={dataMerek.nama} onChange={(e) => setDataMerek({ ...dataMerek, nama: e.target.value })} maxLength={30} required />
            </div>
            <div className={`${styles.form_footer} pt-5 `}>
                <BtnLinkError bs="text-uppercase d-flex" onClick={handleClear}>
                    <HiOutlineTrash className={`${styles.icon_delete}`} />
                    Bersihkan
                </BtnLinkError>
                <div className={styles.footer_btn_wrapper}>
                    <BtnSecondary type="button" bs="me-0 me-xxl-3 me-xl-3 me-lg-3 me-md-0 my-xxl-0 my-2 my-xl-0 my-lg-0 my-md-2" onClick={handleBackToPrevious}>
                        Kembali
                    </BtnSecondary>
                    <BtnPrimary type="submit" value="Simpan" />
                </div>
            </div>
        </form>
    );
};

export default TambahMerek;
