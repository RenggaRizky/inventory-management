import React, { useState, useEffect } from "react";
import { url } from "../../../api";
import { useNavigate, useLocation, Navigate, useOutletContext } from "react-router-dom";
import styles from "../style.module.css";

import { HiOutlineTrash } from "react-icons/hi";

import { BtnLinkError } from "../../../components/button/link/error";
import BtnPrimary from "../../../components/button/primary";
import BtnSecondary from "../../../components/button/secondary";
import InputTel from "../../../components/form/tel";
import InputText from "../../../components/form/text";
import Textarea from "../../../components/form/textarea";
import { Title } from "../../../components/typography/title";
import Spinner from "../../../components/spinner";

const EditSupplier = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [idSupplier, setIdSupplier] = useState(location.state === null ? null : location.state.id);
    const [user, setUser] = useOutletContext();
    const [dataSupplier, setDataSupplier] = useState({
        nama: "",
        namaPerusahaan: "",
        noHandphone: "",
        alamat: "",
    });

    const getInfoSupplier = (id) => {
        url.get(`${id}`)
            .then((response) => {
                setDataSupplier({
                    nama: response.data.nama,
                    namaPerusahaan: response.data.namaPerusahaan,
                    noHandphone: response.data.noHandphone,
                    alamat: response.data.alamat,
                });
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const patchSupplier = (id) => {
        url.patch(`${id}`, dataSupplier)
            .then((response) => {})
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => {
                setTimeout(() => {
                    navigate("/supplier");
                }, 100);
            });
    };

    const handleClear = () => {
        document.getElementById("inputNamaSupplier").value = "";
        document.getElementById("inputNamaPerusahaan").value = "";
        document.getElementById("inputNoHandphoneSupplier").value = "";
        document.getElementById("inputAlamatSupplier").value = "";
        setDataSupplier({ nama: "", namaPerusahaan: "", noHandphone: "", alamat: "" });
    };

    const handleBackToPrevious = () => {
        navigate(-1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        patchSupplier(idSupplier);
    };

    useEffect(() => {
        getInfoSupplier(idSupplier);
    }, [idSupplier]);

    if (user.user.peran === "Pemilik Toko") {
        return <Navigate to="/supplier" replace />;
    }

    if (idSupplier === null) {
        return <Navigate to="/supplier" replace />;
    }

    return (
        <>
            <form onSubmit={handleSubmit} id="formInputSupplier">
                <div className="mt-1 mb-5">
                    <label htmlFor="inputNamaSupplier">
                        <Title margin="0.875rem 0 0.625rem 0.25rem">Nama Supplier</Title>
                    </label>
                    <InputText id="inputNamaSupplier" defaultValue={dataSupplier.nama} onChange={(e) => setDataSupplier({ ...dataSupplier, nama: e.target.value })} maxLength={50} required />
                    <label htmlFor="inputNamaPerusahaan">
                        <Title margin="0.875rem 0 0.625rem 0.25rem">Nama Perusahaan atau Toko</Title>
                    </label>
                    <InputText id="inputNamaPerusahaan" defaultValue={dataSupplier.namaPerusahaan} onChange={(e) => setDataSupplier({ ...dataSupplier, namaPerusahaan: e.target.value })} maxLength={50} required />
                    <label htmlFor="inputNoHandphoneSupplier">
                        <Title margin="0.875rem 0 0.625rem 0.25rem">No. Handphone</Title>
                    </label>
                    <InputTel id="inputNoHandphoneSupplier" defaultValue={dataSupplier.noHandphone} onChange={(e) => setDataSupplier({ ...dataSupplier, noHandphone: e.target.value })} maxLength={12} required />
                    <label htmlFor="inputAlamatSupplier">
                        <Title margin="0.875rem 0 0.625rem 0.25rem">Alamat</Title>
                    </label>
                    <Textarea id="inputAlamatSupplier" defaultValue={dataSupplier.alamat} onChange={(e) => setDataSupplier({ ...dataSupplier, alamat: e.target.value })} rows={8} required />
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
        </>
    );
};

export default EditSupplier;
