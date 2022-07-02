import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { url } from "../../../api";
import styles from "../style.module.css";

import { HiOutlineTrash } from "react-icons/hi";

import { BtnLinkError } from "../../../components/button/link/error";
import BtnPrimary from "../../../components/button/primary";
import BtnSecondary from "../../../components/button/secondary";
import { Title } from "../../../components/typography/title";
import InputNumber from "../../../components/form/number";

const EditStok = () => {
    const navigate = useNavigate();
    const id = useLocation().state.id;

    const [dataStok, setDataStok] = useState({
        batasMinimum: null,
    });

    console.log(id);

    const getInfoStok = (id) => {
        url.get(`${id}`)
            .then((response) => {
                setDataStok({
                    batasMinimum: Number(response.data[0].stok.batasMinimum),
                });
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const patchStok = (id) => {
        url.patch(`${id}`, {
            stok: {
                batasMinimum: Number(dataStok.batasMinimum),
            },
        })
            .then((response) => {})
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => {
                setTimeout(() => {
                    navigate("/stok-barang");
                }, 100);
            });
    };

    const handleBackToPrevious = () => {
        handleClear();
        navigate(-1);
    };

    const handleClear = () => {
        document.getElementById("inputBatasMinimum").value = 0;
        setDataStok({ batasMinimum: 0 });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        patchStok(id);
    };

    useEffect(() => {
        getInfoStok(id);
    }, [id]);

    return (
        <form onSubmit={handleSubmit} id="formInputStok">
            <div className="mt-1 mb-5">
                <label htmlFor="inputBatasMinimum">
                    <Title margin="0.875rem 0 0.625rem 0.25rem">Batas Minimum Stok</Title>
                </label>
                <InputNumber id="inputBatasMinimum" defaultValue={dataStok.batasMinimum} onChange={(e) => setDataStok({ ...dataStok, batasMinimum: e.target.value })} min="0" max="9999" required />
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

export default EditStok;
