import React, { useEffect, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { url } from "../../../api";
import { BtnLinkError } from "../../../components/button/link/error";
import BtnPrimary from "../../../components/button/primary";
import BtnSecondary from "../../../components/button/secondary";
import MainCard from "../../../components/card/main";
import Divider from "../../../components/divider";
import { InputGroupBack, InputGroupBackDisabled } from "../../../components/form/input-group";
import { InputSelect } from "../../../components/form/select";
import InputText from "../../../components/form/text";
import Spinner from "../../../components/spinner";
import { H2 } from "../../../components/typography/heading";
import { Title } from "../../../components/typography/title";
import HeadContent from "../../../layouts/head-content";
import styles from "../style.module.css";

const EditRak = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [idRak, setIdRak] = useState(location.state === null ? null : location.state.id);
    const [user, setUser] = useState(localStorage.getItem("profile") !== null ? JSON.parse(localStorage.getItem("profile")) : null);
    const [dataRak, setDataRak] = useState({
        nama: null,
        lokasi: null,
    });

    const getInfoRak = (id) => {
        url.get(`/rak/${id}`)
            .then((response) => {
                setDataRak({
                    nama: response.data.nama,
                    lokasi: response.data.lokasi,
                });
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const patchRak = (id) => {
        url.patch(`/rak/${id}`, {
            nama: dataRak.nama,
            lokasi: dataRak.lokasi,
        })
            .then((response) => {})
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => {
                setTimeout(() => {
                    navigate(`/rak/${id}`);
                }, 100);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        patchRak(idRak);
    };

    const handleClear = () => {
        document.getElementById("inputNamaRak").value = null;
        document.getElementById("selectLokasiRak").selectedIndex = 0;
        setDataRak({
            nama: null,
            lokasi: null,
        });
    };

    const handleBackToPrevious = () => {
        handleClear();
        navigate(-1);
    };

    useEffect(() => {
        getInfoRak(idRak);
    }, [idRak]);

    const dataLokasi = [
        { id: 1, nama: "Toko" },
        { id: 2, nama: "Gudang" },
    ];

    if (user.user.peran === "Pemilik Toko" || idRak === null) {
        return <Navigate to="/rak" replace />;
    }

    return (
        <>
            {dataRak === null ? (
                <Spinner />
            ) : (
                <div className={styles.wrapper}>
                    <MainCard>
                        <HeadContent title="Edit Rak" subtitle="Perbarui data rak yang dapat dipakai untuk menyimpan barang" />
                        <Divider margin="0 0 24px 0" />
                        <form onSubmit={handleSubmit} id="formInputRak">
                            <div className="mt-1 mb-5">
                                <label htmlFor="inputNamaRak">
                                    <Title margin="2rem 0 0.625rem 0.25rem">Nama Rak</Title>
                                </label>
                                <InputText id="inputNamaRak" defaultValue={dataRak.nama} onChange={(e) => setDataRak({ ...dataRak, nama: e.target.value })} maxLength={30} required />
                                <label htmlFor="inputLokasiRak">
                                    <Title margin="0.875rem 0 0.625rem 0.25rem">Lokasi Rak</Title>
                                </label>
                                <InputSelect data={dataLokasi} value={dataRak.lokasi} onChange={(e) => setDataRak({ ...dataRak, lokasi: e.target.value })} required id="selectLokasiRak" />
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
                    </MainCard>
                </div>
            )}
        </>
    );
};

export default EditRak;
