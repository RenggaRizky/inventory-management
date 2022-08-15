import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { url } from "../../../../api";
import styles from "../../style.module.css";

import { HiOutlineTrash } from "react-icons/hi";

import { BtnLinkError } from "../../../../components/button/link/error";
import BtnPrimary from "../../../../components/button/primary";
import BtnSecondary from "../../../../components/button/secondary";
import { DisabledInputSelect } from "../../../../components/form/select";
import Spinner from "../../../../components/spinner";
import LinkSpan from "../../../../components/typography/link";
import Subtitle from "../../../../components/typography/subtitle";
import { Title } from "../../../../components/typography/title";
import { H2 } from "../../../../components/typography/heading";

const EditBarangRetur1 = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useOutletContext();
    const [dataBarangRetur, setDataBarangRetur] = useState({
        id_produk: null,
        id_supplier: null,
    });

    const [produk, setProduk] = useState(null);
    const [supplier, setSupplier] = useState(null);
    const [idBarangRetur, setIdBarangRetur] = useState(location.state === null ? null : location.state.id);

    const getInfoDataBarangRetur = (id) => {
        url.get(`${id}`)
            .then((response) => {
                setDataBarangRetur({
                    id_produk: response.data[0].id_produk[0]._id,
                    id_supplier: response.data[0].id_supplier[0]._id,
                });
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

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
        document.getElementById("selectSupplierRetur").selectedIndex = 0;
        setDataBarangRetur({
            id_supplier: null,
        });
    };

    const handleBackToPrevious = () => {
        navigate(-1);
    };

    useEffect(() => {
        getInfoDataBarangRetur(idBarangRetur);
        getProduk();
        getSupplier();
    }, []);

    if (user.user.peran === "Pemilik Toko" || idBarangRetur === null) {
        return <Navigate to="/barang-retur" replace />;
    }

    // const dataStatus = [
    //     { key: 1, nama: "Diterima", detail: "Diterima ( diganti dengan barang yang sejenis )" },
    //     { key: 2, nama: "Ditolak", detail: "Diterima ( diganti dengan uang )" },
    //     { key: 3, nama: "Ditolak", detail: "Ditolak" },
    // ];

    return (
        // <form onSubmit={handleSubmit} id="formInputBarangRetur">
        //     <div className="mt-1 mb-5">
        //         <div className="row">
        //             <div className="col">
        //                 <label htmlFor="selectProdukRetur">
        //                     <Title margin="1rem 0 0.625rem 0.25rem">Produk</Title>
        //                 </label>
        //                 <InputSelect id="selectProdukRetur" data={produk} value={dataBarangRetur.id_produk} onChange={(e) => setDataBarangRetur({ ...dataBarangRetur, id_produk: e.target.value })} />
        //                 <Subtitle fontsize="0.75rem" margin="0 0 0 0.25rem">
        //                     *Jika produk tidak ditemukan, maka pergi ke halaman 'Produk' atau klik{" "}
        //                     <LinkSpan fontsize="0.75rem" to="/produk/tambah-produk">
        //                         disini
        //                     </LinkSpan>
        //                 </Subtitle>
        //             </div>
        //             <div className="col">
        //                 <label htmlFor="inputJumlahRetur">
        //                     <Title margin="1rem 0 0.625rem 0.25rem">Jumlah barang</Title>
        //                 </label>
        //                 <InputNumber id="inputJumlahRetur" defaultValue={dataBarangRetur.jumlah} onChange={(e) => setDataBarangRetur({ ...dataBarangRetur, jumlah: e.target.value })} />
        //             </div>
        //             <div className="col">
        //                 <label htmlFor="selectSupplierRetur">
        //                     <Title margin="1rem 0 0.625rem 0.25rem">Supplier</Title>
        //                 </label>
        //                 <select
        //                     id="selectSupplierRetur"
        //                     className={`${styles.input_select} form-select`}
        //                     aria-label="Default select example"
        //                     value={dataBarangRetur.id_supplier}
        //                     onChange={(e) => setDataBarangRetur({ ...dataBarangRetur, id_supplier: e.target.value })}
        //                 >
        //                     <option hidden value=""></option>
        //                     {supplier === null ? (
        //                         <Spinner />
        //                     ) : (
        //                         supplier.map((x) => {
        //                             return (
        //                                 <option key={x._id} value={x._id}>
        //                                     {x.nama} - {x.namaPerusahaan}
        //                                 </option>
        //                             );
        //                         })
        //                     )}
        //                 </select>
        //                 <Subtitle fontsize="0.75rem" margin="0 0 0 0.25rem">
        //                     *Jika supplier tidak ditemukan, maka pergi ke halaman 'Supplier' atau klik{" "}
        //                     <LinkSpan fontsize="0.75rem" to="/supplier/tambah-supplier">
        //                         disini
        //                     </LinkSpan>
        //                 </Subtitle>
        //             </div>
        //         </div>

        //         <label htmlFor="inputAlasanRetur">
        //             <Title margin="1rem 0 0.625rem 0.25rem">Alasan melakukan retur</Title>
        //         </label>
        //         <Textarea id="inputAlasanRetur" defaultValue={dataBarangRetur.alasan} onChange={(e) => setDataBarangRetur({ ...dataBarangRetur, alasan: e.target.value })} rows={8} />

        //         <label htmlFor="inputCatatanRetur">
        //             <Title margin="1rem 0 0.625rem 0.25rem">Catatan</Title>
        //         </label>
        //         <Textarea id="inputCatatanRetur" defaultValue={dataBarangRetur.catatan} onChange={(e) => setDataBarangRetur({ ...dataBarangRetur, catatan: e.target.value })} rows={8} />

        // <label htmlFor="selectStatusRetur">
        //     <Title margin="1rem 0 0.625rem 0.25rem">Status barang retur</Title>
        // </label>
        // <select
        //     id="selectStatusRetur"
        //     className={`${styles.input_select} form-select`}
        //     aria-label="Default select example"
        //     value={dataBarangRetur.status}
        //     onChange={(e) => setDataBarangRetur({ ...dataBarangRetur, status: e.target.value })}
        // >
        //     <option hidden value=""></option>
        //     {dataStatus === null ? (
        //         <Spinner />
        //     ) : (
        //         dataStatus.map((x) => {
        //             return (
        //                 <option key={x._id} value={x.nama}>
        //                     {x.detail}
        //                 </option>
        //             );
        //         })
        //     )}
        // </select>
        //     </div>
        //     <div className={`${styles.form_footer} pt-5 d-flex justify-content-between`}>
        //         <BtnLinkError bs="text-uppercase d-flex" onClick={handleClear}>
        //             <HiOutlineTrash className={`${styles.icon_delete}`} />
        //             Bersihkan
        //         </BtnLinkError>
        //         <div>
        //             <BtnSecondary type="button" bs="me-3" onClick={handleBackToPrevious}>
        //                 Kembali
        //             </BtnSecondary>
        //             <BtnPrimary type="submit" value="Simpan" />
        //         </div>
        //     </div>
        // </form>

        <>
            {produk === null ? (
                <Spinner />
            ) : (
                <form id="formInputBarangRetur1">
                    <div className="p-xxl-5 p-xl-5 p-lg-5 p-md-5 p-sm-0">
                        <H2>1. Pilih Produk & Supplier</H2>
                        <div>
                            <label htmlFor="selectProdukRetur">
                                <Title margin="2rem 0 0.625rem 0.25rem">Produk</Title>
                            </label>
                            <DisabledInputSelect id="selectProdukRetur" data={produk} value={dataBarangRetur.id_produk} onChange={(e) => setDataBarangRetur({ ...dataBarangRetur, id_produk: e.target.value })} required disabled />
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
                    <div className={`${styles.form_footer} pt-5 `}>
                        <BtnLinkError bs="text-uppercase d-flex" onClick={handleClear}>
                            <HiOutlineTrash className={`${styles.icon_delete}`} />
                            Bersihkan
                        </BtnLinkError>
                        <div className={styles.footer_btn_wrapper}>
                            <BtnSecondary type="button" bs="me-0 me-xxl-3 me-xl-3 me-lg-3 me-md-0 my-xxl-0 my-2 my-xl-0 my-lg-0 my-md-2" onClick={handleBackToPrevious}>
                                Kembali
                            </BtnSecondary>
                            {dataBarangRetur.id_supplier === null || dataBarangRetur.id_produk === null ? (
                                <BtnPrimary type="button" disabled={true}>
                                    Selanjutnya
                                </BtnPrimary>
                            ) : (
                                <Link to={"/barang-retur/edit-barang-retur-2"} state={{ id_produk: dataBarangRetur.id_produk, id_supplier: dataBarangRetur.id_supplier, id_barangRetur: idBarangRetur }}>
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

export default EditBarangRetur1;
