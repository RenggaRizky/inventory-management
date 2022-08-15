import React, { useEffect, useState } from "react";
import styles from "../../style.module.css";
import { Navigate, useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { url } from "../../../../api";

import { HiOutlineTrash } from "react-icons/hi";

import { BtnLinkError } from "../../../../components/button/link/error";
import BtnPrimary from "../../../../components/button/primary";
import BtnSecondary from "../../../../components/button/secondary";
import { InputNumber } from "../../../../components/form/number";
import Textarea from "../../../../components/form/textarea";
import Spinner from "../../../../components/spinner";
import { H2 } from "../../../../components/typography/heading";
import { Title } from "../../../../components/typography/title";
import DisableForm from "../../../../components/form/disable";
import P from "../../../../components/typography/paragraph";

const EditBarangRetur2 = () => {
    const location = useLocation();
    const [idProduk, setIdProduk] = useState(location.state === null ? null : location.state.id_produk);
    const [idSupplier, setIdSupplier] = useState(location.state === null ? null : location.state.id_supplier);
    const [idBarangRetur, setIdBarangRetur] = useState(location.state === null ? null : location.state.id_barangRetur);
    const navigate = useNavigate();

    const [user, setUser] = useOutletContext();
    const [dataBarangRetur, setDataBarangRetur] = useState({
        alasan: null,
        catatan: "-",
        jumlahReturBaru: null,
    });

    const [produk, setProduk] = useState(null);
    const [jumlahReturLama, setJumlahReturLama] = useState(null);

    const getInfoDataBarangRetur = (id) => {
        url.get(`/barang-retur/${id}`)
            .then((response) => {
                setDataBarangRetur({
                    alasan: response.data[0].alasan,
                    catatan: response.data[0].catatan,
                    jumlahReturBaru: response.data[0].jumlah,
                });
                setJumlahReturLama(response.data[0].jumlah);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const patchBarangRetur = (id) => {
        url.patch(`${id}`, {
            alasan: dataBarangRetur.alasan,
            catatan: dataBarangRetur.catatan,
            jumlahReturBaru: dataBarangRetur.jumlahReturBaru,
            jumlahReturLama: jumlahReturLama,
            id_produk: idProduk,
            id_supplier: idSupplier,
        })
            .then((response) => {})
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => {
                setTimeout(() => {
                    navigate("/barang-retur");
                }, 100);
            });
    };

    const getInfoProduk = (id) => {
        url.get(`/produk/${id}`)
            .then((response) => {
                setProduk(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const handleClear = () => {
        document.getElementById("inputAlasanRetur").value = "";
        document.getElementById("inputCatatanRetur").value = "";
        setDataBarangRetur({
            alasan: null,
            catatan: "-",
        });
    };

    const handleBackToPrevious = () => {
        navigate(-1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        patchBarangRetur(idBarangRetur);
        // patchStokProsesRetur(idProduk);
    };

    useEffect(() => {
        getInfoDataBarangRetur(idBarangRetur);
        getInfoProduk(idProduk);
    }, []);

    if (user.user.peran === "Pemilik Toko") {
        return <Navigate to="/barang-retur" replace />;
    }

    if (idProduk === null && idSupplier === null && idBarangRetur === null) {
        return <Navigate to="/barang-retur/edit-barang-retur-1" replace />;
    }

    return (
        <>
            {produk === null ? (
                <Spinner />
            ) : (
                <form onSubmit={handleSubmit} id="inputBarangRetur2">
                    <div className="p-xxl-5 p-xl-5 p-lg-5 p-md-5 p-sm-0">
                        <H2>2. Isi Keterangan Retur Barang</H2>
                        <label htmlFor="DisableinputJumlahRetur">
                            <Title margin="2rem 0 0.625rem 0.25rem">Jumlah retur</Title>
                        </label>
                        {/* <DisableForm id="DisableinputJumlahRetur" defaultValue={dataBarangRetur.jumlah} required /> */}
                        <InputNumber
                            id="inputJumlahRetur"
                            defaultValue={dataBarangRetur.jumlahReturBaru}
                            onChange={(e) => setDataBarangRetur({ ...dataBarangRetur, jumlahReturBaru: e.target.value })}
                            min="1"
                            max={produk === null ? 9999 : Number(produk[0].stok.total + Number(jumlahReturLama))}
                            required
                        />
                        <label htmlFor="inputAlasanRetur">
                            <Title margin="2rem 0 0.625rem 0.25rem">Alasan melakukan retur</Title>
                        </label>
                        <Textarea id="inputAlasanRetur" defaultValue={dataBarangRetur.alasan} onChange={(e) => setDataBarangRetur({ ...dataBarangRetur, alasan: e.target.value })} rows={8} required />

                        <label htmlFor="inputCatatanRetur">
                            <Title margin="2rem 0 0.625rem 0.25rem">Catatan</Title>
                        </label>
                        <Textarea id="inputCatatanRetur" defaultValue={dataBarangRetur.catatan} onChange={(e) => setDataBarangRetur({ ...dataBarangRetur, catatan: e.target.value })} rows={8} />
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
                            <BtnPrimary type="submit" value="Simpan"></BtnPrimary>
                        </div>
                    </div>
                </form>
            )}
        </>
    );
};

export default EditBarangRetur2;
