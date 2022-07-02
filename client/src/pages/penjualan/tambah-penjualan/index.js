import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../../../api";
import styles from "../style.module.css";

import BtnPrimary from "../../../components/button/primary";
import Spinner from "../../../components/spinner";
import { H3, H4, H5, H6 } from "../../../components/typography/heading";
import Subtitle from "../../../components/typography/subtitle";
import P from "../../../components/typography/paragraph";
import BtnSecondary from "../../../components/button/secondary";
import Divider from "../../../components/divider";
import { Title } from "../../../components/typography/title";
import InputText from "../../../components/form/text";
import DisableForm from "../../../components/form/disable";
import Checkbox from "../../../components/checkbox";

const TambahPenjualan = () => {
    const navigate = useNavigate();

    const [produk, setProduk] = useState(null);
    const [dupProduk, setDupProduk] = useState(null);
    const [statusNoNota, setStatusNoNota] = useState(false);
    const [btnStatus, setBtnStatus] = useState(false);
    const [count, setCount] = useState(0);

    const [barangKeluar, setBarangKeluar] = useState([]);
    const [noNota, setNoNota] = useState(null);

    const numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const tambahJumlahBarang = (produk) => {
        const barangAdaDiDaftar = barangKeluar.find((x) => x._id === produk._id);
        if (barangAdaDiDaftar) {
            setBarangKeluar(barangKeluar.map((x) => (x._id === produk._id ? { ...barangAdaDiDaftar, jumlahKeluar: barangAdaDiDaftar.jumlahKeluar + 1 } : x)));
        } else {
            setBarangKeluar([...barangKeluar, { ...produk, jumlahKeluar: 1 }]);
        }
    };

    const kurangJumlahBarang = (produk) => {
        const barangAdaDiDaftar = barangKeluar.find((x) => x._id === produk._id);
        if (barangAdaDiDaftar.jumlahKeluar === 1) {
            setBarangKeluar(barangKeluar.filter((x) => x._id !== produk._id));
        } else {
            setBarangKeluar(barangKeluar.map((x) => (x._id === produk._id ? { ...barangAdaDiDaftar, jumlahKeluar: barangAdaDiDaftar.jumlahKeluar - 1 } : x)));
        }
    };

    const totalHarga = barangKeluar.reduce((previous, current) => previous + current.jumlahKeluar * current.harga, 0);

    // const getProduk = () => {
    //     url.get("/produk")
    //         .then((response) => {
    //             setProduk(response.data);
    //         })
    //         .catch((error) => {
    //             console.log(error.message);
    //         });
    // };

    const postPenjualan = () => {
        url.post("tambah-penjualan", {
            barangKeluar: barangKeluar.map((x) => ({ id_produk: x._id, jumlahKeluar: Number(x.jumlahKeluar) })),
            totalHarga: Number(totalHarga),
            noNota: noNota !== null ? `NOTA#${noNota}` : undefined,
        })
            .then((response) => {})
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => {
                setTimeout(() => {
                    handleClear();
                    navigate("/penjualan");
                }, 100);
            });
    };

    const patchBarangKeluar = (id, jumlahKeluar) => {
        url.patch(`/stok-barang/barang-keluar/${id}`, {
            jumlahKeluar,
        })
            .then((response) => {})
            .catch((error) => {
                console.log(error.message);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postPenjualan();

        barangKeluar.map((x) => {
            return patchBarangKeluar(x._id, x.jumlahKeluar);
        });
    };

    const handleClear = () => {
        setBarangKeluar([]);
        setNoNota(null);
    };

    const handleBackToPrevious = () => {
        navigate(-1);
    };

    useEffect(() => {
        // getProduk();

        const getProduk = () => {
            url.get("/produk")
                .then((response) => {
                    setProduk(response.data);
                    setDupProduk(response.data);
                })
                .catch((error) => {
                    console.log(error.message);
                });
        };

        getProduk();
    }, []);

    const setDisabledButton = (produk) => {
        if (barangKeluar.length !== 0) {
            setBtnStatus(barangKeluar.filter((data) => data._id === produk._id)[0].jumlahKeluar === Number(barangKeluar.filter((data) => data._id === produk._id)[0].stok.total - 1));
        } else {
            setBtnStatus(false);
        }
    };

    const handleTambahJumlahMainSection = (produk) => {
        // setDisabledButton(produk);
        tambahJumlahBarang(produk);
        setCount((prev) => prev + 1);
    };

    console.log(count);

    // console.log(setDisabledButton());

    // console.log(barangKeluar.filter((x) => x._id === "62ac31930fcbd5d676074bce")[0].stok.total <= barangKeluar.filter((x) => x._id === "62ac31930fcbd5d676074bce")[0].jumlahKeluar);
    return (
        <>
            {produk === null ? (
                <Spinner />
            ) : (
                <div className="row">
                    <div className="col-7">
                        <div className="row">
                            {produk.map((x) => {
                                return (
                                    <div className="col-4 mb-3" key={x._id}>
                                        <div className="card p-3 h-100 d-flex flex-column justify-content-between">
                                            <div className="d-flex justify-content-center">
                                                <img src={`data:image/png;base64, ${x.gambar}`} alt={x.nama} className={`${styles.product_picture_list} mb-2`} />
                                            </div>
                                            <div>
                                                <H6 className={`text-justify mb-2`}>{x.nama}</H6>
                                            </div>
                                            <div className="mb-3">
                                                <div className="d-flex justify-content-between">
                                                    <Subtitle fontsize="0.75rem">Jumlah Stok :</Subtitle>
                                                    <Subtitle fontsize="0.75rem">
                                                        {x.stok.total} {x.id_satuanbarang[0].nama}
                                                    </Subtitle>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <Subtitle fontsize="0.75rem" lineheight="5px">
                                                        Harga :
                                                    </Subtitle>
                                                    <Subtitle fontsize="0.75rem" lineheight="5px">
                                                        Rp {numberWithCommas(x.harga)}
                                                    </Subtitle>
                                                </div>
                                            </div>
                                            {x.stok.total <= 0 ? (
                                                <BtnPrimary type="button" onClick={() => tambahJumlahBarang(x)} disabled={true}>
                                                    Pilih
                                                </BtnPrimary>
                                            ) : (
                                                <BtnPrimary type="button" onClick={() => handleTambahJumlahMainSection(x)}>
                                                    Pilih
                                                </BtnPrimary>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="col">
                        <div className={`${styles.list_wrapper}`}>
                            <H4 margin="0 0 32px 0">Daftar Barang Penjualan</H4>
                            {barangKeluar.length === 0 && (
                                <div className="d-flex justify-content-center align-items-center p-5">
                                    <P texttransform="uppercase">Belum ada penjualan</P>
                                </div>
                            )}
                            {barangKeluar.map((x) => {
                                return (
                                    <div className="card border-0" style={{ backgroundColor: "#f9fafb" }} key={x._id}>
                                        <div className="p-3 d-flex">
                                            <div className="align-self-center me-3">
                                                <img src={`data:image/png;base64, ${x.gambar}`} alt={x.nama} className={styles.product_picture_order} />
                                            </div>
                                            <div className="text-uppercase align-self-center w-100">
                                                <H5 className="mb-1">{x.nama}</H5>
                                                <div className="d-flex justify-content-between">
                                                    <Subtitle fontsize="1rem">Rp {numberWithCommas(x.harga)}</Subtitle>
                                                    <div className="d-flex">
                                                        <BtnSecondary type="button" bs="px-1 py-0" onClick={() => kurangJumlahBarang(x)}>
                                                            {" "}
                                                            -{" "}
                                                        </BtnSecondary>
                                                        <Subtitle margin="0 1rem" fontsize="1rem" fontweight="600" color="#111928">
                                                            {x.jumlahKeluar}
                                                        </Subtitle>
                                                        {/* <BtnSecondary type="button" bs="px-1 py-0" onClick={() => setDisabledButton(x)} disabled={btnStatus}> */}
                                                        <BtnSecondary type="button" bs="px-1 py-0" onClick={() => tambahJumlahBarang(x)} disabled={x.jumlahKeluar >= x.stok.total ? true : false}>
                                                            {" "}
                                                            +{" "}
                                                        </BtnSecondary>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                            {barangKeluar.length !== 0 && (
                                <>
                                    <Divider margin="2rem 0" />
                                    <div className="d-flex justify-content-between align-items-center">
                                        <P>Total</P>
                                        <H3>Rp {numberWithCommas(totalHarga)}</H3>
                                    </div>
                                </>
                            )}

                            <Divider margin="2rem 0" />

                            <form onSubmit={handleSubmit}>
                                <label htmlFor="InputNoNota">
                                    <Title margin="0 0 0.625rem 0.25rem">Nomor Nota</Title>
                                </label>
                                {statusNoNota === false ? <InputText required defaultValue={noNota} onChange={(e) => setNoNota(e.target.value)} /> : <DisableForm type="text" />}
                                <Checkbox label="Isi nomor nota secara otomatis" id="noNota" onClick={() => setStatusNoNota(!statusNoNota)} />
                                <BtnPrimary type="submit" value="Simpan" bs="w-100 mt-4 mb-2" disabled={barangKeluar.length === 0 ? true : false} />
                                <BtnSecondary type="button" bs="w-100" onClick={handleBackToPrevious}>
                                    Kembali
                                </BtnSecondary>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TambahPenjualan;
