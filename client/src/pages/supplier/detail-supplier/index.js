import React, { useEffect, useState } from "react";
import styles from "../style.module.css";
import { url } from "../../../api";
import { useLocation, useNavigate } from "react-router-dom";

import { BsTruck } from "react-icons/bs";

import { H2, H3 } from "../../../components/typography/heading";
import Subtitle from "../../../components/typography/subtitle";
import Overline from "../../../components/typography/overline";
import Spinner from "../../../components/spinner";
import BtnSecondary from "../../../components/button/secondary";

const DetailSupplier = () => {
    const navigate = useNavigate();
    const getId = useLocation().pathname.split("/")[2];
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

    const handleBackToPrevious = () => {
        navigate(-1);
    };

    useEffect(() => {
        getInfoSupplier(getId);
    }, [getId]);

    return (
        <>
            {dataSupplier.nama === "" && dataSupplier.namaPerusahaan === "" && dataSupplier.noHandphone === "" && dataSupplier.alamat === "" ? (
                <Spinner />
            ) : (
                <div className="my-2">
                    <div className="card mb-5">
                        <div className="card-header p-4 mb-1">
                            <div className="d-flex align-items-center">
                                <div className={`${styles.icon_supplier_wrapper} me-4`}>
                                    <BsTruck className={styles.icon_supplier} />
                                </div>
                                <div>
                                    <H2 bs="text-uppercase">{dataSupplier.nama}</H2>
                                    <Subtitle>{dataSupplier.namaPerusahaan}</Subtitle>
                                </div>
                            </div>
                        </div>

                        <div className="card-body p-4 mb-5">
                            <div className="row">
                                <div className="col-5">
                                    <div className="mb-3">
                                        <Overline>Nama Supplier</Overline>
                                        <H3>{dataSupplier.nama}</H3>
                                    </div>
                                    <div>
                                        <Overline>Nama Perusahaan</Overline>
                                        <H3>{dataSupplier.namaPerusahaan}</H3>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="mb-3">
                                        <Overline>Nama Supplier</Overline>
                                        <H3>{dataSupplier.noHandphone}</H3>
                                    </div>
                                    <div>
                                        <Overline>Nama Perusahaan</Overline>
                                        <H3>{dataSupplier.alamat}</H3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end">
                        <BtnSecondary type="button" onClick={handleBackToPrevious}>
                            Kembali
                        </BtnSecondary>
                    </div>
                </div>
            )}
        </>
    );
};

export default DetailSupplier;
