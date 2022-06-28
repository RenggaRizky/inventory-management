import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../../../api";
import styles from "../style.module.css";

import { HiOutlineTrash } from "react-icons/hi";

import BtnPrimary from "../../../components/button/primary";
import BtnSecondary from "../../../components/button/secondary";
import InputText from "../../../components/form/text";
import { Title } from "../../../components/typography/title";
import BtnLinkError from "../../../components/button/link/error";

const TambahSatuanBarang = () => {
    const navigate = useNavigate();

    const [dataSatuanBarang, setDataSatuanBarang] = useState({
        nama: "",
    });

    const postSatuanBarang = () => {
        url.post("tambah-satuan-barang", {
            nama: dataSatuanBarang.nama.toUpperCase(),
        })
            .then((response) => {})
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => {
                setTimeout(() => {
                    handleClear();
                    navigate("/satuan-barang");
                }, 50);
            });
    };

    const handleClear = () => {
        document.getElementById("inputSatuanBarang").value = "";
        setDataSatuanBarang({ nama: "" });
    };

    const handleBackToPrevious = () => {
        handleClear();
        navigate(-1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postSatuanBarang();
    };

    return (
        <form onSubmit={handleSubmit} id="formInputSatuanBarang">
            <div className="mt-1 mb-5">
                <label htmlFor="inputSatuanBarang">
                    <Title margin="0.875rem 0 0.625rem 0.25rem">Nama Satuan Barang</Title>
                </label>
                <InputText id="inputSatuanBarang" defaultValue={dataSatuanBarang.nama} onChange={(e) => setDataSatuanBarang({ ...dataSatuanBarang, nama: e.target.value })} maxLength={30} required />
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

export default TambahSatuanBarang;
