import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { url } from "../../../api";
import styles from "../style.module.css";

import { HiOutlineTrash } from "react-icons/hi";

import BtnLinkError from "../../../components/button/link/error";
import BtnPrimary from "../../../components/button/primary";
import BtnSecondary from "../../../components/button/secondary";
import InputText from "../../../components/form/text";
import Title from "../../../components/typography/title";

const EditJenisBarang = () => {
    const navigate = useNavigate();
    const id = useLocation().state.id;

    const [dataJenisBarang, setDataJenisBarang] = useState({
        nama: "",
    });

    const getInfoJenisBarang = (id) => {
        url.get(`${id}`)
            .then((response) => {
                setDataJenisBarang({
                    nama: response.data.nama,
                });
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const patchJenisBarang = (id) => {
        url.patch(`${id}`, dataJenisBarang)
            .then((response) => {})
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => {
                setTimeout(() => {
                    navigate("/jenis-barang");
                }, 100);
            });
    };

    const handleBackToPrevious = () => {
        handleClear();
        navigate("/jenis-barang");
    };

    const handleClear = () => {
        document.getElementById("inputJenisBarang").value = "";
        setDataJenisBarang({ nama: "" });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        patchJenisBarang(id);
    };

    useEffect(() => {
        getInfoJenisBarang(id);
    }, [id]);

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

export default EditJenisBarang;
