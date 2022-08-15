import React, { useEffect, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { Navigate, useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { url } from "../../../../api";
import styles from "../../style.module.css";

import { BtnLinkError } from "../../../../components/button/link/error";
import BtnPrimary from "../../../../components/button/primary";
import BtnSecondary from "../../../../components/button/secondary";
import { InputNumber } from "../../../../components/form/number";
import Textarea from "../../../../components/form/textarea";
import { H2 } from "../../../../components/typography/heading";
import { Title } from "../../../../components/typography/title";
import Spinner from "../../../../components/spinner";

const TambahBarangRetur2 = () => {
    const location = useLocation();
    const [idProduk, setIdProduk] = useState(location.state === null ? null : location.state.id_produk);
    const [idSupplier, setIdSupplier] = useState(location.state === null ? null : location.state.id_supplier);
    const navigate = useNavigate();

    const [user, setUser] = useOutletContext();
    const [dataBarangRetur, setDataBarangRetur] = useState({
        status: "Diproses",
        alasan: null,
        catatan: "-",
        jumlah: null,
    });

    const [produk, setProduk] = useState(null);

    const postBarangRetur = () => {
        url.post("/barang-retur/tambah-barang-retur", {
            status: dataBarangRetur.status,
            alasan: dataBarangRetur.alasan,
            catatan: dataBarangRetur.catatan,
            jumlah: Number(dataBarangRetur.jumlah),
            id_produk: idProduk,
            id_supplier: idSupplier,
        })
            .then((response) => {})
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => {
                setTimeout(() => {
                    handleClear();
                    navigate("/barang-retur");
                }, 100);
            });
    };

    const patchStokProsesRetur = (id) => {
        url.patch(`/stok-barang/proses-retur/${id}`, {
            jumlah: Number(dataBarangRetur.jumlah),
        })
            .then((response) => {})
            .catch((error) => {
                console.log(error.message);
            });
    };

    const getProduk = () => {
        url.get("/produk")
            .then((response) => {
                setProduk(response.data.filter((x) => x._id === idProduk));
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        patchStokProsesRetur(idProduk);
        postBarangRetur();
    };

    const handleClear = () => {
        document.getElementById("inputJumlahRetur").value = null;
        document.getElementById("inputAlasanRetur").value = null;
        document.getElementById("inputCatatanRetur").value = "-";
        setDataBarangRetur({
            status: "Diproses",
            alasan: null,
            catatan: "-",
            jumlah: null,
        });
    };

    const handleBackToPrevious = () => {
        navigate(-1);
    };

    useEffect(() => {
        getProduk();
    }, [idProduk]);

    if (user.user.peran === "Pemilik Toko") {
        return <Navigate to="/barang-retur" replace />;
    }

    if (idProduk === null && idSupplier === null) {
        return <Navigate to="/barang-retur/tambah-barang-retur-1" replace />;
    }

    return (
        <>
            {produk === null ? (
                <Spinner />
            ) : (
                <form onSubmit={handleSubmit} id="inputBarangRetur2">
                    <div className="p-xxl-5 p-xl-5 p-lg-5 p-md-5 p-sm-0">
                        <H2>2. Isi Keterangan Retur Barang</H2>
                        <label htmlFor="inputJumlahRetur">
                            <Title margin="2rem 0 0.625rem 0.25rem">Jumlah barang</Title>
                        </label>
                        <InputNumber
                            id="inputJumlahRetur"
                            defaultValue={dataBarangRetur.jumlah}
                            onChange={(e) => setDataBarangRetur({ ...dataBarangRetur, jumlah: e.target.value })}
                            min="1"
                            max={produk === null ? 9999 : produk[0].stok.total}
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

export default TambahBarangRetur2;
