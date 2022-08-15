import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useOutletContext, Navigate } from "react-router-dom";
import { url } from "../../../api";
import styles from "../style.module.css";

import { HiOutlineTrash } from "react-icons/hi";

import { Title } from "../../../components/typography/title";
import InputText from "../../../components/form/text";
import { BtnLinkError } from "../../../components/button/link/error";
import BtnSecondary from "../../../components/button/secondary";
import BtnPrimary from "../../../components/button/primary";

const EditMerek = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [idMerek, setIdMerek] = useState(location.state === null ? null : location.state.id);

    const [user, setUser] = useOutletContext();
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
        patchMerek(idMerek);
    };

    useEffect(() => {
        getInfoMerek(idMerek);
    }, [idMerek]);

    if (user.user.peran === "Pemilik Toko" || idMerek === null) {
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

export default EditMerek;
