import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { url } from "../../../api";
import BtnPrimary from "../../../components/button/primary";
import BtnSecondary from "../../../components/button/secondary";
import Checkbox from "../../../components/checkbox";
import Divider from "../../../components/divider";
import DisableForm from "../../../components/form/disable";
import { SupplierInputSelect } from "../../../components/form/select";
import InputText from "../../../components/form/text";
import Spinner from "../../../components/spinner";
import { H3, H4, H5, H6 } from "../../../components/typography/heading";
import LinkSpan from "../../../components/typography/link";
import P from "../../../components/typography/paragraph";
import Subtitle from "../../../components/typography/subtitle";
import { Title } from "../../../components/typography/title";
import styles from "../style.module.css";

const EditPembelian = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [idPembelian, setIdPembelian] = useState(location.state === null ? null : location.state.id);
    const [dataPembelian, setDataPembelian] = useState(null);

    const [produk, setProduk] = useState(null);
    const [supplier, setSupplier] = useState(null);
    const [idSupplier, setIdSupplier] = useState(null);
    const [barangMasuk, setBarangMasuk] = useState([]);
    const [dataTotalHarga, setDataTotalHarga] = useState(null);
    const [dataSupplier, setDataSupplier] = useState(null);
    const [dataNota, setDataNota] = useState(null);
    const [test, setTest] = useState(null);

    const [user, setUser, responseErrorMessage, setResponseErrorMessage] = useOutletContext();

    const numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const tambahJumlahBarang = (produk) => {
        const barangAdaDiDaftar = barangMasuk.find((x) => x._id === produk._id);
        if (barangAdaDiDaftar) {
            setBarangMasuk(barangMasuk.map((x) => (x._id === produk._id ? { ...barangAdaDiDaftar, jumlahMasuk: barangAdaDiDaftar.jumlahMasuk + 1 } : x)));
        } else {
            setBarangMasuk([...barangMasuk, { ...produk, jumlahMasuk: 1 }]);
        }
        produk.stok.total++;
    };

    const kurangJumlahBarang = (produk) => {
        const barangAdaDiDaftar = barangMasuk.find((x) => x._id === produk._id);
        if (barangAdaDiDaftar.jumlahMasuk === 1) {
            setBarangMasuk(barangMasuk.filter((x) => x._id !== produk._id));
        } else {
            setBarangMasuk(barangMasuk.map((x) => (x._id === produk._id ? { ...barangAdaDiDaftar, jumlahMasuk: barangAdaDiDaftar.jumlahMasuk - 1 } : x)));
        }
        produk.stok.total--;
    };

    // const totalHarga = barangMasuk.reduce((previous, current) => previous + current.jumlahMasuk * current.harga, 0);

    const handleSubmit = () => {};
    const handleBackToPrevious = () => {};

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

    const getInfoPembelian = (id) => {
        url.get(`${id}`)
            .then((response) => {
                // setDataBarangMasuk(response.data[0].barangMasuk);
                setDataSupplier(response.data[0].id_supplier[0]._id);
                setDataTotalHarga(response.data[0].totalHarga);
                setDataNota(response.data[0].noNota);
                // setDataPembelian(response.data);

                setBarangMasuk(response.data[0].barangMasuk);
                // console.log(response.data[0].barangMasuk);
                setTest()
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    useEffect(() => {
        getProduk();
        getSupplier();
        getInfoPembelian(idPembelian);
    }, [idPembelian]);

    if (user.user.peran === "Pemilik Toko") {
        return <Navigate to="/pembelian" replace />;
    }

    if (idPembelian === null) {
        return <Navigate to="/pembelian" replace />;
    }

    console.log(barangMasuk);

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
                                                    <Subtitle fontsize="0.75rem">Stok :</Subtitle>
                                                    <Subtitle fontsize="0.75rem">
                                                        {x.stok.total}/{`${(Number(x.id_rak[0].susun.kapasitas.$numberDecimal) / Number(x.volume.$numberDecimal)).toFixed()}`}
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
                                            <BtnPrimary
                                                type="button"
                                                onClick={() => tambahJumlahBarang(x)}
                                                disabled={x.stok.total >= (Number(x.id_rak[0].susun.kapasitas.$numberDecimal) / Number(x.volume.$numberDecimal)).toFixed() ? true : false}
                                            >
                                                {/* {(Number(x.id_rak[0].susun.kapasitas.$numberDecimal) / Number(x.volume.$numberDecimal)).toFixed()} */}
                                                Pilih
                                            </BtnPrimary>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="col">
                        {barangMasuk === null ? (
                            <Spinner />
                        ) : (
                            <div className={`${styles.list_wrapper}`}>
                                <H4 margin="0 0 32px 0">Daftar Barang Pembelian</H4>
                                {barangMasuk.length === 0 && (
                                    <div className="d-flex justify-content-center align-items-center p-5">
                                        <P texttransform="uppercase">Belum ada pembelian</P>
                                    </div>
                                )}
                                {barangMasuk.map((x) => {
                                    return (
                                        <div className="card border-0" style={{ backgroundColor: "#f9fafb" }} key={x.id_produk._id}>
                                            <div className="p-3 d-flex">
                                                <div className="align-self-center me-3">
                                                    <img src={`data:image/png;base64, ${x.id_produk.gambar}`} alt={x.id_produk.nama} className={styles.product_picture_order} />
                                                </div>
                                                <div className="text-uppercase align-self-center w-100">
                                                    <H5 className="mb-1">{x.id_produk.nama}</H5>
                                                    <div className="d-flex justify-content-between">
                                                        <Subtitle fontsize="1rem">Rp {numberWithCommas(x.id_produk.harga)}</Subtitle>
                                                        <div className="d-flex">
                                                            <BtnSecondary type="button" bs="px-1 py-0" onClick={() => kurangJumlahBarang(x.id_produk)}>
                                                                {" "}
                                                                -{" "}
                                                            </BtnSecondary>
                                                            <Subtitle margin="0 1rem" fontsize="1rem" fontweight="600" color="#111928">
                                                                {x.jumlahMasuk}
                                                            </Subtitle>
                                                            <BtnSecondary
                                                                type="button"
                                                                bs="px-1 py-0"
                                                                onClick={() => tambahJumlahBarang(x.id_produk)}
                                                                // disabled={x.stok.total >= (Number(x.id_rak[0].susun.kapasitas.$numberDecimal) / Number(x.volume.$numberDecimal)).toFixed() ? true : false}
                                                            >
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

                                {barangMasuk.length !== 0 && (
                                    <>
                                        <Divider margin="2rem 0" />
                                        <div className="d-flex justify-content-between align-items-center">
                                            <P>Total</P>
                                            {dataTotalHarga === null && <H3>"</H3>}
                                            {dataTotalHarga !== null && <H3>Rp {numberWithCommas(dataTotalHarga)}</H3>}
                                        </div>
                                    </>
                                )}
                                <Divider margin="2rem 0" />
                                <form onSubmit={handleSubmit}>
                                    <label htmlFor="InputNoNota">
                                        <Title margin="0 0 0.625rem 0.25rem">Nomor Nota</Title>
                                    </label>
                                    {dataNota === null && <DisableForm type="text" />}
                                    {dataNota !== null && <DisableForm type="text" value={dataNota.slice(5)} />}
                                    <label htmlFor="SelectIdMerek">
                                        <Title margin="1rem 0 0.625rem 0">Supplier</Title>
                                    </label>
                                    {dataSupplier === null && <SupplierInputSelect data={supplier} bs="mb-1" defaultValue="" />}
                                    {dataSupplier !== null && <SupplierInputSelect data={supplier} bs="mb-1" defaultValue={dataSupplier} onChange={(e) => setDataSupplier(e.target.value)} required />}
                                    <Subtitle fontsize="0.75rem" margin="0 0 1rem 0.25rem">
                                        *Jika supplier tidak ditemukan, maka pergi ke halaman 'Supplier' atau klik{" "}
                                        <LinkSpan fontsize="0.75rem" to="/supplier/tambah-supplier">
                                            disini
                                        </LinkSpan>
                                    </Subtitle>
                                    <BtnPrimary type="submit" value="Simpan" bs="w-100 mb-2" disabled={barangMasuk.length === 0 ? true : false} />
                                    <BtnSecondary type="button" bs="w-100" onClick={handleBackToPrevious}>
                                        Kembali
                                    </BtnSecondary>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default EditPembelian;
