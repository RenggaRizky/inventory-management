import React, { useState } from "react";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
import { url } from "../../../api";
import styles from "../style.module.css";

import { HiOutlineTrash } from "react-icons/hi";

import BtnPrimary from "../../../components/button/primary";
import BtnSecondary from "../../../components/button/secondary";
import InputText from "../../../components/form/text";
import { Title } from "../../../components/typography/title";
import { BtnLinkError } from "../../../components/button/link/error";

const TambahJenisBarang = () => {
    const navigate = useNavigate();

    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const [user, setUser] = useOutletContext();
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

    if (user.user.peran === "Pemilik Toko") {
        return <Navigate to="/jenis-barang" replace />;
    }

    return (
        <form onSubmit={handleSubmit} id="formInputJenisBarang">
            <div className="mt-1 mb-5">
                <label htmlFor="inputJenisBarang">
                    <Title margin="0.875rem 0 0.625rem 0.25rem">Nama Jenis Barang</Title>
                </label>
                <InputText id="inputJenisBarang" defaultValue={dataJenisBarang.nama} onChange={(e) => setDataJenisBarang({ ...dataJenisBarang, nama: e.target.value })} maxLength={30} required />
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

export default TambahJenisBarang;
