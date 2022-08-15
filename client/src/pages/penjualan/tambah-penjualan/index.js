import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
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
import { AiOutlineWarning } from "react-icons/ai";
import { InputNumberDisableArrows } from "../../../components/form/number";
import BtnGrey from "../../../components/button/grey";
import { GrFormClose } from "react-icons/gr";

// const TambahPenjualan = () => {
//     const navigate = useNavigate();

//     const [produk, setProduk] = useState(null);
//     const [statusNoNota, setStatusNoNota] = useState(false);

//     const [barangKeluar, setBarangKeluar] = useState([]);
//     const [noNota, setNoNota] = useState(null);
//     const [user, setUser, responseErrorMessage, setResponseErrorMessage] = useOutletContext();
//     const [refresh, setRefresh] = useState();

//     const numberWithCommas = (number) => {
//         return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
//     };

//     const tambahJumlahBarang = (produk) => {
//         const barangAdaDiDaftar = barangKeluar.find((x) => x._id === produk._id);
//         if (barangAdaDiDaftar) {
//             setBarangKeluar(barangKeluar.map((x) => (x._id === produk._id ? { ...barangAdaDiDaftar, jumlahKeluar: barangAdaDiDaftar.jumlahKeluar + 1 } : x)));
//         } else {
//             setBarangKeluar([...barangKeluar, { ...produk, jumlahKeluar: 1 }]);
//         }
//         produk.stok.total--;
//     };

//     const kurangJumlahBarang = (produk) => {
//         const barangAdaDiDaftar = barangKeluar.find((x) => x._id === produk._id);
//         if (barangAdaDiDaftar.jumlahKeluar === 1) {
//             setBarangKeluar(barangKeluar.filter((x) => x._id !== produk._id));
//         } else {
//             setBarangKeluar(barangKeluar.map((x) => (x._id === produk._id ? { ...barangAdaDiDaftar, jumlahKeluar: barangAdaDiDaftar.jumlahKeluar - 1 } : x)));
//         }
//         produk.stok.total++;
//     };

//     const totalHarga = barangKeluar.reduce((previous, current) => previous + current.jumlahKeluar * current.harga, 0);

//     const getProduk = () => {
//         url.get("/produk")
//             .then((response) => {
//                 setProduk(response.data);
//             })
//             .catch((error) => {
//                 console.log(error.message);
//             });
//     };

//     const postPenjualan = () => {
//         url.post("tambah-penjualan", {
//             barangKeluar: barangKeluar.map((x) => ({ id_produk: x._id, jumlahKeluar: Number(x.jumlahKeluar) })),
//             totalHarga: Number(totalHarga),
//             // noNota: noNota !== null ? `NOTA#${noNota}` : undefined,
//         })
//             .then((response) => {})
//             .catch((error) => {
//                 console.log(error.message);
//             });
//         // .finally(() => {
//         //     setTimeout(() => {
//         //         handleClear();
//         //         navigate("/penjualan");
//         //         window.location.reload();
//         //     }, 100);
//         // });
//     };

//     const patchBarangKeluar = (id, jumlahKeluar) => {
//         url.patch(`/stok-barang/barang-keluar/${id}`, {
//             jumlahKeluar,
//         })
//             .then((response) => {
//                 if (response.status !== 404 || response.status !== 409 || response.status !== 403 || response.status !== 500) {
//                     setTimeout(() => {
//                         handleClear();
//                         navigate("/penjualan");
//                         window.location.reload();
//                     }, 50);
//                 }
//             })
//             .catch((error) => {
//                 setResponseErrorMessage(error.response.data);
//             });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         barangKeluar.map((x) => {
//             return patchBarangKeluar(x._id, x.jumlahKeluar);
//         });
//         postPenjualan();
//     };

//     const handleClear = () => {
//         setBarangKeluar([]);
//         setNoNota(null);
//     };

//     const handleBackToPrevious = () => {
//         navigate(-1);
//     };

//     useEffect(() => {
//         getProduk();
//     }, []);

//     if (user.user.peran === "Pemilik Toko") {
//         return <Navigate to="/penjualan" replace />;
//     }

//     return (
//         <>
//             {produk === null ? (
//                 <Spinner />
//             ) : (
//                 <div className="row">
//                     <div className="col-7">
//                         <div className="row">
//                             {produk.map((x) => {
//                                 return (
//                                     <div className="col-4 mb-3" key={x._id}>
//                                         <div className="card p-3 h-100 d-flex flex-column justify-content-between">
//                                             <div className="d-flex justify-content-center">
//                                                 <img src={`data:image/png;base64, ${x.gambar}`} alt={x.nama} className={`${styles.product_picture_list} mb-2`} />
//                                             </div>
//                                             <div>
//                                                 <H6 className={`text-justify mb-2`}>{x.nama}</H6>
//                                             </div>
//                                             <div className="mb-3">
//                                                 <div className="d-flex justify-content-between">
//                                                     <Subtitle fontsize="0.75rem">Jumlah Stok :</Subtitle>
//                                                     <Subtitle fontsize="0.75rem">{x.stok.total}</Subtitle>
//                                                 </div>
//                                                 <div className="d-flex justify-content-between">
//                                                     <Subtitle fontsize="0.75rem" lineheight="5px">
//                                                         Harga :
//                                                     </Subtitle>
//                                                     <Subtitle fontsize="0.75rem" lineheight="5px">
//                                                         Rp {numberWithCommas(x.harga)}
//                                                     </Subtitle>
//                                                 </div>
//                                             </div>
//                                             {x.stok.total <= 0 && (
//                                                 <BtnPrimary type="button" onClick={() => tambahJumlahBarang(x)} disabled={true}>
//                                                     Pilih
//                                                 </BtnPrimary>
//                                             )}
//                                             {x.stok.total !== 0 && (
//                                                 <BtnPrimary type="button" onClick={() => tambahJumlahBarang(x)}>
//                                                     Pilih
//                                                 </BtnPrimary>
//                                             )}
//                                         </div>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     </div>
//                     <div className="col">
//                         <div className={`${styles.list_wrapper}`}>
//                             <H4 margin="0 0 32px 0">Daftar Barang Penjualan</H4>
//                             {barangKeluar.length === 0 && (
//                                 <div className="d-flex justify-content-center align-items-center p-5">
//                                     <P texttransform="uppercase">Belum ada penjualan</P>
//                                 </div>
//                             )}
//                             {barangKeluar.map((x) => {
//                                 return (
//                                     <div className="card border-0" style={{ backgroundColor: "#f9fafb" }} key={x._id}>
//                                         <div className="p-3 d-flex">
//                                             <div className="align-self-center me-3">
//                                                 <img src={`data:image/png;base64, ${x.gambar}`} alt={x.nama} className={styles.product_picture_order} />
//                                             </div>
//                                             <div className="text-uppercase align-self-center w-100">
//                                                 <H5 className="mb-1">{x.nama}</H5>
//                                                 <div className="d-flex justify-content-between">
//                                                     <Subtitle fontsize="1rem">Rp {numberWithCommas(x.harga)}</Subtitle>
//                                                     <div className="d-flex">
//                                                         <BtnSecondary type="button" bs="px-1 py-0" onClick={() => kurangJumlahBarang(x)}>
//                                                             {" "}
//                                                             -{" "}
//                                                         </BtnSecondary>
//                                                         <Subtitle margin="0 1rem" fontsize="1rem" fontweight="600" color="#111928">
//                                                             {x.jumlahKeluar}
//                                                         </Subtitle>
//                                                         <BtnSecondary type="button" bs="px-1 py-0" onClick={() => tambahJumlahBarang(x)} disabled={x.stok.total === 0 ? true : false}>
//                                                             {" "}
//                                                             +{" "}
//                                                         </BtnSecondary>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 );
//                             })}

//                             {barangKeluar.length !== 0 && (
//                                 <>
//                                     <Divider margin="2rem 0" />
//                                     <div className="d-flex justify-content-between align-items-center">
//                                         <P>Total</P>
//                                         <H3>Rp {numberWithCommas(totalHarga)}</H3>
//                                     </div>
//                                 </>
//                             )}

//                             <Divider margin="2rem 0" />

//                             <form onSubmit={handleSubmit}>
//                                 {/* <label htmlFor="InputNoNota">
//                                     <Title margin="0 0 0.625rem 0.25rem">Nomor Nota</Title>
//                                 </label>
//                                 {statusNoNota === false ? <InputText required defaultValue={noNota} onChange={(e) => setNoNota(e.target.value)} /> : <DisableForm type="text" />}
//                                 <Checkbox label="Isi nomor nota secara otomatis" id="noNota" onClick={() => setStatusNoNota(!statusNoNota)} /> */}
//                                 <BtnPrimary type="button" data-bs-toggle="modal" bs="w-100 my-2" data-bs-target="#warningPenjualan" disabled={barangKeluar.length === 0 ? true : false}>
//                                     Simpan
//                                 </BtnPrimary>
//                                 <div className={`${styles.modal} modal fade`} id="warningPenjualan" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
//                                     <div className="modal-dialog modal-dialog-centered modal-lg modal-fullscreen-lg-down">
//                                         <div className="modal-content">
//                                             <div className={`${styles.modal_header} modal-header`}>
//                                                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalDelete"></button>
//                                             </div>
//                                             <div className={`${styles.modal_body} modal-body text-center mb-5`}>
//                                                 <div className={`${styles.icon_warning_wrapper} rounded-circle`}>
//                                                     <AiOutlineWarning className={styles.icon_warning} />
//                                                 </div>
//                                                 <H3 className="text-uppercase" margin="1rem">
//                                                     Apakah kamu yakin ingin <br /> memasukan data penjualan?
//                                                 </H3>
//                                                 <P>Data yang sudah di simpan tidak akan bisa diubah kembali</P>
//                                             </div>
//                                             <div className={`${styles.modal_footer} modal-footer`}>
//                                                 <BtnSecondary type="button" data-bs-dismiss="modal">
//                                                     Batal
//                                                 </BtnSecondary>
//                                                 <BtnPrimary type="submit" value="Ya" onClick={() => setRefresh({})} />
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <BtnSecondary type="button" bs="w-100" onClick={handleBackToPrevious}>
//                                     Kembali
//                                 </BtnSecondary>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default TambahPenjualan;

const TambahPenjualan = () => {
    const [produk, setProduk] = useState(null);
    const navigate = useNavigate();

    const [barangKeluar, setBarangKeluar] = useState([]);

    const numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const totalHarga = barangKeluar.reduce((previous, current) => previous + Number(current.jumlahKeluar) * current.harga, 0);

    const getProduk = () => {
        url.get("/produk")
            .then((response) => {
                setProduk(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const tambahJumlahBarang = (produk) => {
        const barangAdaDiDaftar = barangKeluar.find((x) => x._id === produk._id);
        if (!barangAdaDiDaftar) {
            setBarangKeluar([...barangKeluar, { ...produk, jumlahKeluar: 1 }]);
        }
    };

    const handleClear = () => {
        setBarangKeluar([]);
    };

    const handleChangeQty = (event, index) => {
        let cloneBarangKeluar = [...barangKeluar];
        let obj = cloneBarangKeluar[index];
        obj.jumlahKeluar = event.target.value;
        cloneBarangKeluar[index] = obj;
        setBarangKeluar([...cloneBarangKeluar]);
    };

    const handleDeleteItem = (index) => {
        let cloneBarangKeluar = [...barangKeluar];
        cloneBarangKeluar.splice(index, 1);
        setBarangKeluar(cloneBarangKeluar);
    };

    const postPenjualan = () => {
        url.post("tambah-penjualan", {
            barangKeluar: barangKeluar.map((x) => ({ id_produk: x._id, jumlahKeluar: Number(x.jumlahKeluar) })),
            totalHarga: Number(totalHarga),
            noNota: `NOTA-${Math.random().toString(36).slice(2)}`,
        })
            .then((response) => {})
            .catch((error) => {
                console.log(error.message);
            });
        // .finally(() => {
        //     setTimeout(() => {
        //         handleClear();
        //         navigate("/penjualan");
        //         window.location.reload();
        //     }, 100);
        // });
    };

    const patchBarangKeluar = (id, jumlahKeluar) => {
        url.patch(`/stok-barang/barang-keluar/${id}`, {
            jumlahKeluar,
        })
            .then((response) => {
                if (response.status !== 404 || response.status !== 409 || response.status !== 403 || response.status !== 500) {
                    setTimeout(() => {
                        handleClear();
                        navigate("/penjualan");
                        window.location.reload();
                    }, 50);
                }
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        barangKeluar.map((x) => {
            return patchBarangKeluar(x._id, x.jumlahKeluar);
        });
        postPenjualan();
    };

    const handleBackToPrevious = () => {
        navigate(-1);
    };

    useEffect(() => {
        getProduk();
    }, []);

    return (
        <>
            {produk === null ? (
                <Spinner />
            ) : (
                <div className="row">
                    <div className={`${styles.product_sales_wrapper} col-xxl-7 col-xl-7 col-lg-6 col-md-12 col-sm-12 col-12`}>
                        <div className="row">
                            {produk.map((x) => {
                                return (
                                    <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-4 mb-3" key={x._id}>
                                        <div className={`${styles.product_sales_container} card p-3 h-100`}>
                                            <div className="d-flex justify-content-center">
                                                <img src={`data:image/png;base64, ${x.gambar}`} alt={x.nama} className={`${styles.product_picture_list} mb-2`} />
                                            </div>
                                            <div className={styles.product_sales_description_wrapper}>
                                                <div>
                                                    <H6 className={`text-justify mb-2`}>{x.nama}</H6>
                                                </div>
                                                <div className={`${styles.product_sales_description} mb-3`}>
                                                    <div className="d-flex justify-content-between">
                                                        <Subtitle fontsize="0.75rem">Jumlah Stok :</Subtitle>
                                                        <Subtitle fontsize="0.75rem">{x.stok.total}</Subtitle>
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
                                                {x.stok.total <= 0 && (
                                                    <BtnPrimary bs="w-100" type="button" onClick={() => tambahJumlahBarang(x)} disabled={true}>
                                                        Pilih
                                                    </BtnPrimary>
                                                )}
                                                {x.stok.total !== 0 && (
                                                    <BtnPrimary bs="w-100" type="button" onClick={() => tambahJumlahBarang(x)}>
                                                        Pilih
                                                    </BtnPrimary>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="col mt-md-5 mt-xxl-0 mt-xl-0 mt-lg-0 mt-0">
                        <div className={`${styles.list_wrapper}`}>
                            <H4 margin="0 0 32px 0">Daftar Barang Penjualan</H4>
                            {barangKeluar.length === 0 && (
                                <div className="d-flex justify-content-center align-items-center p-5">
                                    <P texttransform="uppercase">Belum ada penjualan</P>
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                {barangKeluar.map((x, index) => {
                                    return (
                                        <div className={`${styles.product_in_cart} card border-0`} style={{ backgroundColor: "#f9fafb" }} key={x._id}>
                                            <div className="p-xxl-3 p-xl-3 p-lg-3 p-md-3 p-sm-2 d-flex">
                                                <div className="align-self-center me-3">
                                                    <img src={`data:image/png;base64, ${x.gambar}`} alt={x.nama} className={styles.product_picture_order} />
                                                </div>
                                                <div className="align-self-center w-100">
                                                    <H5 className="text-uppercase mb-2">{x.nama}</H5>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <Subtitle fontsize="1rem" bs="text-nowrap">
                                                            Rp {numberWithCommas(x.harga)}
                                                        </Subtitle>
                                                        <div className="d-flex align-items-center justify-content-end">
                                                            <H6 margin="0 0.75rem 0 0">QTY:</H6>{" "}
                                                            <InputNumberDisableArrows defaultValue={x.jumlahKeluar} onChange={(e) => handleChangeQty(e, index)} bs="w-25 p-1" min={1} max={Number(x.stok.total)} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <BtnGrey type="button" onClick={() => handleDeleteItem(index)} bs="align-self-start p-0 m-0">
                                                    <GrFormClose className={styles.delete_btn} />
                                                </BtnGrey>
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
                                {/* <label htmlFor="InputNoNota">
                                    <Title margin="0 0 0.625rem 0.25rem">Nomor Nota</Title>
                                </label>
                                {statusNoNota === false ? <InputText required defaultValue={noNota} onChange={(e) => setNoNota(e.target.value)} /> : <DisableForm type="text" />}
                                <Checkbox label="Isi nomor nota secara otomatis" id="noNota" onClick={() => setStatusNoNota(!statusNoNota)} /> */}
                                <BtnPrimary type="button" data-bs-toggle="modal" bs="w-100 my-2" data-bs-target="#warningPenjualan" disabled={barangKeluar.length === 0 ? true : false}>
                                    Simpan
                                </BtnPrimary>
                                <div className={`${styles.modal} modal fade`} id="warningPenjualan" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered modal-lg modal-fullscreen-lg-down">
                                        <div className="modal-content">
                                            <div className={`${styles.modal_header} modal-header`}>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalDelete"></button>
                                            </div>
                                            <div className={`${styles.modal_body} modal-body text-center mb-5`}>
                                                <div className={`${styles.icon_warning_wrapper} rounded-circle`}>
                                                    <AiOutlineWarning className={styles.icon_warning} />
                                                </div>
                                                <H3 className="text-uppercase" margin="1rem">
                                                    Apakah kamu yakin ingin <br /> memasukan data penjualan?
                                                </H3>
                                                <P>Data yang sudah di simpan tidak akan bisa diubah kembali</P>
                                            </div>
                                            <div className={`${styles.modal_footer} modal-footer`}>
                                                <BtnSecondary type="button" data-bs-dismiss="modal">
                                                    Batal
                                                </BtnSecondary>
                                                <BtnPrimary type="submit" value="Ya" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
