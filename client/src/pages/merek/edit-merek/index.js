import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { url } from "../../../api";
import styles from "../style.module.css";

import { HiOutlineTrash } from "react-icons/hi";

import Title from "../../../components/typography/title";
import InputText from "../../../components/form/text";
import BtnLinkError from "../../../components/button/link/error";
import BtnSecondary from "../../../components/button/secondary";
import BtnPrimary from "../../../components/button/primary";

const EditMerek = () => {
    const navigate = useNavigate();
    const id = useLocation().state.id;

    const [dataMerek, setDataMerek] = useState({
        nama: "",
    });

    const getInfoMerek = (id) => {
        url.get(`${id}`)
            .then((response) => {
                setDataMerek({
                    nama: response.data.nama,
                });
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const patchMerek = (id) => {
        url.patch(`${id}`, dataMerek)
            .then((response) => {})
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => {
                setTimeout(() => {
                    navigate("/merek");
                }, 100);
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
        patchMerek(id);
    };

    useEffect(() => {
        getInfoMerek(id);
    }, [id]);

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

export default EditMerek;
