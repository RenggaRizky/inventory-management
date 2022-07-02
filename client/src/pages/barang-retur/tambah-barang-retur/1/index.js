import React, { useEffect, useState } from "react";
import styles from "../../style.module.css";
import { url } from "../../../../api";
import { Link, useNavigate } from "react-router-dom";

import { HiOutlineTrash } from "react-icons/hi";

import { ReturInputSelect } from "../../../../components/form/select";
import LinkSpan from "../../../../components/typography/link";
import Subtitle from "../../../../components/typography/subtitle";
import { Title } from "../../../../components/typography/title";
import { BtnLinkError } from "../../../../components/button/link/error";
import BtnSecondary from "../../../../components/button/secondary";
import BtnPrimary from "../../../../components/button/primary";
import Spinner from "../../../../components/spinner";
import { H2 } from "../../../../components/typography/heading";

const TambahBarangRetur1 = () => {
    const navigate = useNavigate();
    const [dataBarangRetur, setDataBarangRetur] = useState({
        id_produk: null,
        id_supplier: null,
    });

    const [produk, setProduk] = useState(null);
    const [supplier, setSupplier] = useState(null);

    const getProduk = () => {
        url.get("/produk")
            .then((response) => {
                setProduk(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const getSupplier = () => {
        url.get("/supplier")
            .then((response) => {
                setSupplier(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const handleClear = () => {
        document.getElementById("selectProdukRetur").selectedIndex = 0;
        document.getElementById("selectSupplierRetur").selectedIndex = 0;
        setDataBarangRetur({
            id_produk: "",
            id_supplier: "",
        });
    };

    const handleBackToPrevious = () => {
        navigate("/barang-retur");
    };

    useEffect(() => {
        getProduk();
        getSupplier();
    }, []);

    return (
        <>
            {produk === null ? (
                <Spinner />
            ) : (
                <form id="formInputBarangRetur1">
                    <div className="p-5">
                        <H2>1. Pilih Produk & Supplier</H2>
                        <div>
                            <label htmlFor="selectProdukRetur">
                                <Title margin="2rem 0 0.625rem 0.25rem">Produk</Title>
                            </label>
                            <ReturInputSelect id="selectProdukRetur" data={produk} value={dataBarangRetur.id_produk} onChange={(e) => setDataBarangRetur({ ...dataBarangRetur, id_produk: e.target.value })} required />
                            <Subtitle fontsize="0.75rem" margin="0 0 0 0.25rem">
                                *Jika produk tidak ditemukan, maka pergi ke halaman 'Produk' atau klik{" "}
                                <LinkSpan fontsize="0.75rem" to="/produk/tambah-produk">
                                    disini
                                </LinkSpan>
                            </Subtitle>
                            <label htmlFor="selectSupplierRetur">
                                <Title margin="1rem 0 0.625rem 0.25rem">Supplier</Title>
                            </label>
                            <select
                                id="selectSupplierRetur"
                                className={`${styles.input_select} form-select`}
                                aria-label="Default select example"
                                value={dataBarangRetur.id_supplier}
                                onChange={(e) => setDataBarangRetur({ ...dataBarangRetur, id_supplier: e.target.value })}
                                required
                            >
                                <option hidden value=""></option>
                                {supplier === null ? (
                                    <Spinner />
                                ) : (
                                    supplier.map((x) => {
                                        return (
                                            <option key={x._id} value={x._id}>
                                                {x.nama} - {x.namaPerusahaan}
                                            </option>
                                        );
                                    })
                                )}
                            </select>
                            <Subtitle fontsize="0.75rem" margin="0 0 0 0.25rem">
                                *Jika supplier tidak ditemukan, maka pergi ke halaman 'Supplier' atau klik{" "}
                                <LinkSpan fontsize="0.75rem" to="/supplier/tambah-supplier">
                                    disini
                                </LinkSpan>
                            </Subtitle>
                        </div>
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
                            {dataBarangRetur.id_supplier === null || dataBarangRetur.id_produk === null ? (
                                <BtnPrimary type="button" disabled={true}>
                                    Selanjutnya
                                </BtnPrimary>
                            ) : (
                                <Link to={"/barang-retur/tambah-barang-retur-2"} state={{ id_produk: dataBarangRetur.id_produk, id_supplier: dataBarangRetur.id_supplier }}>
                                    <BtnPrimary type="button">Selanjutnya</BtnPrimary>
                                </Link>
                            )}
                        </div>
                    </div>
                </form>
            )}
        </>
    );
};

export default TambahBarangRetur1;
