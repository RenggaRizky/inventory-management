import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate, useOutletContext } from "react-router-dom";
import styles from "../style.module.css";

import { Title } from "../../../components/typography/title";
import { BtnLinkError } from "../../../components/button/link/error";
import { HiOutlineTrash } from "react-icons/hi";
import BtnSecondary from "../../../components/button/secondary";
import BtnPrimary from "../../../components/button/primary";
import { url } from "../../../api";
import { InputSelect } from "../../../components/form/select";
import Spinner from "../../../components/spinner";
import { ErrorAlert } from "../../../components/alert";
import P from "../../../components/typography/paragraph";

const EditStatusRetur = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser, responseErrorMessage, setResponseErrorMessage] = useOutletContext();
    const [idBarangRetur, setIdBarangRetur] = useState(location.state === null ? null : location.state.id);
    const [statusBarangRetur, setStatusBarangRetur] = useState(null);

    const getStatusBarangRetur = (id) => {
        url.get(`/barang-retur/status-retur/${id}`)
            .then((response) => {
                setStatusBarangRetur(response.data[0].status);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const patchStatusBarangRetur = (id) => {
        url.patch(`/barang-retur/edit-status-retur/${id}`, {
            status: statusBarangRetur,
        })
            .then((response) => {
                if (response.status !== 404 || response.status !== 409 || response.status !== 403 || response.status !== 500) {
                    setTimeout(() => {
                        handleClear();
                        navigate("/barang-retur");
                        // window.location.reload();
                    }, 50);
                }
            })
            .catch((error) => {
                setResponseErrorMessage(error.response.data);
            })
            .finally(() => {
                setTimeout(() => {
                    handleClear();
                    navigate("/barang-retur");
                }, 100);
            });
    };

    const handleClear = () => {
        document.getElementById("selectStatusRetur").selectedIndex = 0;
        setStatusBarangRetur("");
    };
    const handleBackToPrevious = () => {
        handleClear();
        navigate(-1);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        patchStatusBarangRetur(idBarangRetur);
    };

    useEffect(() => {
        getStatusBarangRetur(idBarangRetur);
    }, [idBarangRetur]);

    if (user.user.peran === "Pemilik Toko") {
        return <Navigate to="/barang-retur" replace />;
    }

    if (idBarangRetur === null) {
        return <Navigate to="/barang-retur" replace />;
    }

    const dataStatus = [
        { key: 1, nama: "Diterima Ganti Barang", detail: "Diterima ( diganti dengan barang yang sejenis )" },
        { key: 2, nama: "Diterima Ganti Uang", detail: "Diterima ( diganti dengan uang )" },
        { key: 3, nama: "Ditolak", detail: "Ditolak" },
        { key: 4, nama: "Diproses", detail: "Diproses" },
    ];

    return (
        <form onSubmit={handleSubmit} id="formInputStatusRetur">
            <div className="mt-1 mb-5">
                <label htmlFor="inputStatusRetur">
                    <Title margin="0.875rem 0 0.625rem 0.25rem">Status Barang Retur</Title>
                </label>

                <select id="selectStatusRetur" className={`${styles.input_select} form-select`} value={statusBarangRetur} onChange={(e) => setStatusBarangRetur(e.target.value)}>
                    <option hidden value=""></option>
                    {dataStatus === null ? (
                        <Spinner />
                    ) : (
                        dataStatus.map((x) => {
                            return (
                                <option key={x._id} value={x.nama}>
                                    {x.detail}
                                </option>
                            );
                        })
                    )}
                </select>
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

export default EditStatusRetur;
