import React, { useEffect, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { url } from "../../../api";
import BtnDelete from "../../../components/button/delete";
import BtnPrimary from "../../../components/button/primary";
import BtnSecondary from "../../../components/button/secondary";
import { InputSelect, SupplierInputSelect } from "../../../components/form/select";
import InputText from "../../../components/form/text";
import Spinner from "../../../components/spinner";
import { H4, H5, H6 } from "../../../components/typography/heading";
import P from "../../../components/typography/paragraph";
import Subtitle from "../../../components/typography/subtitle";
import { Title } from "../../../components/typography/title";
import styles from "../style.module.css";

const TambahPembelian = () => {
    const [pembelianIdSupplier, setPembelianIdSupplier] = useState("");
    const [pembelianIdProduk, setPembelianIdProduk] = useState([]);
    const [pembelianProduk, setPembelianProduk] = useState([]);
    const [pembelianJumlahBarang, setPembelianJumlahBarang] = useState([1]);
    const [pembelianJumlahHarga, setPembelianJumlahHarga] = useState([]);
    const [pembelianTotalHarga, setPembelianTotalHarga] = useState(0);
    const [jumlahDibeli, setJumlahDibeli] = useState(1);

    const [infoProduk, setInfoProduk] = useState(null);
    const [produk, setProduk] = useState(null);
    const [supplier, setSupplier] = useState(null);

    const numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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

    const getInfoProduk = (id) => {
        url.get(`/produk/${id}`)
            .then((response) => {
                setInfoProduk(response.data);
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

    const setDaftarPembelian = (produk, idproduk) => {
        // const setDaftarPembelian = (idproduk, jumlahbarang, jumlahharga) => {
        // setPembelianJumlahBarang([...pembelianJumlahBarang, jumlahbarang]);
        // setPembelianJumlahHarga([...pembelianJumlahHarga, jumlahharga]);
        setPembelianProduk([...pembelianProduk, produk]);
        setPembelianIdProduk([...pembelianIdProduk, idproduk]);
        pembelianJumlahBarang([...pembelianJumlahBarang, jumlahDibeli]);
        // getInfoProduk(idproduk);
        // setPembelianIdProduk([...pembelianIdProduk, idproduk]);
    };

    useEffect(() => {
        getProduk();
        getSupplier();
    }, []);

    const minJumlahDibeli = () => {
        setPembelianJumlahBarang((prevValue) => prevValue - 1);
    };

    const plusJumlahDibeli = () => {
        setPembelianJumlahBarang((prevValue) => prevValue + 1);
    };

    console.log(pembelianIdProduk);
    console.log(pembelianJumlahBarang);
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
                                            <BtnPrimary type="button" onClick={() => setDaftarPembelian(x, x._id)}>
                                                Pilih
                                            </BtnPrimary>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="col">
                        <div className={`${styles.list_wrapper}`}>
                            <H4 margin="0 0 32px 0">Daftar Barang Pembelian</H4>
                            <div>
                                {pembelianProduk.map((data, index) => {
                                    return (
                                        <div className="card border-0" style={{ backgroundColor: "#f9fafb" }}>
                                            <div className="p-3 d-flex">
                                                <div className="align-self-center me-3">
                                                    <img src={`data:image/png;base64, ${data.gambar}`} alt={data.nama} className={styles.product_picture_order} />
                                                </div>
                                                <div className="text-uppercase align-self-center w-100">
                                                    <H5 className="mb-1">{data.nama}</H5>
                                                    <div className="d-flex justify-content-between">
                                                        <Subtitle fontsize="1rem">Rp {numberWithCommas(data.harga)}</Subtitle>
                                                        <div className="d-flex">
                                                            {/* <BtnSecondary type="button" bs="px-1 py-0"> */}
                                                            <BtnSecondary type="button" bs="px-1 py-0" onClick={minJumlahDibeli}>
                                                                -
                                                            </BtnSecondary>
                                                            <Subtitle margin="0 1rem" fontsize="1rem" fontweight="600" color="#111928">
                                                                {pembelianJumlahBarang}
                                                            </Subtitle>
                                                            {/* <BtnSecondary type="button" bs="px-1 py-0"> */}
                                                            <BtnSecondary type="button" bs="px-1 py-0" onClick={plusJumlahDibeli}>
                                                                +
                                                            </BtnSecondary>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <BtnDelete type="button">
                                                    <HiOutlineTrash />
                                                </BtnDelete> */}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <label htmlFor="SelectIdMerek">
                                <Title margin="2rem 0 0.625rem 0">Supplier</Title>
                            </label>
                            <SupplierInputSelect data={supplier} bs="mb-3" />
                            <BtnPrimary type="submit" value={`Bayar Rp ${pembelianTotalHarga}`} bs="w-100" />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TambahPembelian;
