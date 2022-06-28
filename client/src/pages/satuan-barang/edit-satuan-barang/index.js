import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { url } from "../../../api";
import styles from "../style.module.css";

import { HiOutlineTrash } from "react-icons/hi";

import BtnLinkError from "../../../components/button/link/error";
import BtnPrimary from "../../../components/button/primary";
import BtnSecondary from "../../../components/button/secondary";
import InputText from "../../../components/form/text";
import { Title } from "../../../components/typography/title";

const EditSatuanBarang = () => {
    const navigate = useNavigate();
    const id = useLocation().state.id;

    const [dataSatuanBarang, setDataSatuanBarang] = useState({
        nama: "",
    });

    const getInfoSatuanBarang = (id) => {
        url.get(`${id}`)
            .then((response) => {
                setDataSatuanBarang({
                    nama: response.data.nama,
                });
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const patchSatuanBarang = (id) => {
        url.patch(`${id}`, {
            nama: dataSatuanBarang.nama.toUpperCase(),
        })
            .then((response) => {})
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => {
                setTimeout(() => {
                    navigate("/satuan-barang");
                }, 100);
            });
    };

    const handleBackToPrevious = () => {
        handleClear();
        navigate(-1);
    };

    const handleClear = () => {
        document.getElementById("inputSatuanBarang").value = "";
        setDataSatuanBarang({ nama: "" });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        patchSatuanBarang(id);
    };

    useEffect(() => {
        getInfoSatuanBarang(id);
    }, [id]);

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

export default EditSatuanBarang;
