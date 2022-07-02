import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { url } from "../../../api";
import styles from "../style.module.css";
import moment from "moment";
import "moment/locale/id";

import Spinner from "../../../components/spinner";
import { TbPackgeImport } from "react-icons/tb";
import { H2, H3, H4, H6 } from "../../../components/typography/heading";
import Subtitle from "../../../components/typography/subtitle";
import BtnSecondary from "../../../components/button/secondary";
import Overline from "../../../components/typography/overline";
import P from "../../../components/typography/paragraph";

const DetailPembelian = () => {
    const navigate = useNavigate();
    const getId = useLocation().pathname.split("/")[2];
    const [dataBarangMasuk, setDataBarangMasuk] = useState(null);
    const [dataSupplier, setDataSupplier] = useState(null);
    const [dataPerusahaanSupplier, setDataPerusahaanSupplier] = useState(null);
    const [dataTotalHarga, setDataTotalHarga] = useState(null);
    const [dataNoNota, setDataNoNota] = useState(null);
    const [dataTanggalPembelian, setDataTanggalPembelian] = useState(null);

    const getInfoPembelian = (id) => {
        url.get(`${id}`)
            .then((response) => {
                setDataBarangMasuk(response.data[0].barangMasuk);
                setDataSupplier(response.data[0].id_supplier[0].nama);
                setDataPerusahaanSupplier(response.data[0].id_supplier[0].namaPerusahaan);
                setDataTotalHarga(response.data[0].totalHarga);
                setDataNoNota(response.data[0].noNota);
                setDataTanggalPembelian(response.data[0].tanggalPembelian);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const handleBackToPrevious = () => {
        navigate(-1);
    };

    useEffect(() => {
        getInfoPembelian(getId);
    }, [getId]);

    const tableheaddata = [
        {
            key: 1,
            title: "Produk",
        },
        {
            key: 2,
            title: "Jumlah",
        },
        {
            key: 3,
            title: "Harga",
        },
    ];

    const numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    return (
        <>
            {dataBarangMasuk === null ? (
                <Spinner />
            ) : (
                <div className="my-2">
                    <div className="card mb-4">
                        <div className="card-header p-4 mb-1">
                            <div className="d-flex align-items-center">
                                <div className={`${styles.icon_product_wrapper} me-4`}>
                                    <TbPackgeImport className={styles.icon_product} />
                                </div>
                                <div>
                                    <H2 bs="text-uppercase">{dataNoNota}</H2>
                                    <Subtitle>{moment(dataTanggalPembelian).format("LL")}</Subtitle>
                                </div>
                            </div>
                        </div>

                        <div className="card-body p-4 mb-5">
                            <div className="mb-3">
                                <Overline>Nomor Nota</Overline>
                                <H3>{dataNoNota}</H3>
                            </div>
                            <div className="mb-3">
                                <Overline>Tanggal Pembelian</Overline>
                                <H3>{moment(dataTanggalPembelian).format("LLLL")}</H3>
                            </div>
                            <div className="mb-3">
                                <Overline>Supplier</Overline>
                                <H3>
                                    {dataSupplier} dari {dataPerusahaanSupplier}
                                </H3>
                            </div>
                            <table className={`${styles.table} table mb-3`}>
                                <thead className={styles.table_head}>
                                    {tableheaddata.map((data) => {
                                        return (
                                            <th scope="col" key={data.key} className="text-uppercase" style={{ width: data.width }}>
                                                <H6 fontsize="0.75rem" color="#6B7280" fontweight="600">
                                                    {data.title}
                                                </H6>
                                            </th>
                                        );
                                    })}
                                </thead>
                                <tbody className={styles.table_body}>
                                    {dataBarangMasuk.map((data) => {
                                        return (
                                            <tr key={data._id} className="align-middle">
                                                <td className="text-capitalize">
                                                    <P color="#616161" fontsize="0.875rem">
                                                        {data.id_produk.nama}
                                                    </P>
                                                </td>
                                                <td className="text-capitalize">
                                                    <P color="#616161" fontsize="0.875rem">
                                                        {data.jumlahMasuk}
                                                    </P>
                                                </td>
                                                <td className="text-capitalize">
                                                    <P color="#616161" fontsize="0.875rem">
                                                        Rp {numberWithCommas(data.id_produk.harga)}
                                                    </P>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    <tr>
                                        <td colspan="2">
                                            <H4>TOTAL</H4>
                                        </td>
                                        {dataTotalHarga !== null && (
                                            <td>
                                                <H6>Rp {numberWithCommas(dataTotalHarga)}</H6>
                                            </td>
                                        )}
                                    </tr>
                                </tbody>
                            </table>
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

export default DetailPembelian;
