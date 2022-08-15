import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { url } from "../../../api";
import styles from "../style.module.css";
import moment from "moment";
import "moment/locale/id";

import Spinner from "../../../components/spinner";
import { TbPackgeExport } from "react-icons/tb";
import { H2, H3, H4, H6 } from "../../../components/typography/heading";
import Subtitle from "../../../components/typography/subtitle";
import Overline from "../../../components/typography/overline";
import P from "../../../components/typography/paragraph";
import BtnSecondary from "../../../components/button/secondary";

const DetailPenjualan = () => {
    const navigate = useNavigate();
    const getId = useLocation().pathname.split("/")[2];
    const [dataBarangKeluar, setDataBarangKeluar] = useState(null);
    const [dataTotalHarga, setDataTotalHarga] = useState(null);
    const [dataNoNota, setDataNoNota] = useState(null);
    const [dataTanggalPenjualan, setDataTanggalPenjualan] = useState(null);

    const getInfoPenjualan = (id) => {
        url.get(`${id}`)
            .then((response) => {
                setDataBarangKeluar(response.data[0].barangKeluar);
                setDataTotalHarga(response.data[0].totalHarga);
                setDataNoNota(response.data[0].noNota);
                setDataTanggalPenjualan(response.data[0].tanggalPenjualan);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const handleBackToPrevious = () => {
        navigate(-1);
    };

    useEffect(() => {
        getInfoPenjualan(getId);
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
            {dataBarangKeluar === null ? (
                <Spinner />
            ) : (
                <div className="my-2">
                    <div className="card mb-4">
                        <div className="card-header p-4 mb-1">
                            <div className="d-flex align-items-center">
                                <div className={`${styles.icon_product_wrapper} me-4`}>
                                    <TbPackgeExport className={styles.icon_product} />
                                </div>
                                <div>
                                    <H2 bs="text-uppercase">{dataNoNota}</H2>
                                    <Subtitle>{moment(dataTanggalPenjualan).format("LL")}</Subtitle>
                                </div>
                            </div>
                        </div>

                        <div className="card-body p-4 mb-5">
                            <div className="mb-3">
                                <Overline>Nomor Nota</Overline>
                                <H3>{dataNoNota}</H3>
                            </div>
                            <div className="mb-3">
                                <Overline>Tanggal Penjualan</Overline>
                                <H3>{moment(dataTanggalPenjualan).format("LLLL")}</H3>
                            </div>
                            <div className="table-responsive">
                                <table className={`${styles.table} table mb-3`}>
                                    <thead className={styles.table_head}>
                                        {tableheaddata.map((data) => {
                                            return (
                                                <th scope="col" key={data.key} className="text-uppercase">
                                                    <H6 fontsize="0.75rem" color="#6B7280" fontweight="600">
                                                        {data.title}
                                                    </H6>
                                                </th>
                                            );
                                        })}
                                    </thead>
                                    <tbody className={styles.table_body}>
                                        {dataBarangKeluar.map((data) => {
                                            return (
                                                <tr key={data._id} className="align-middle">
                                                    <td className="text-capitalize text-nowrap">
                                                        <P color="#616161" fontsize="0.875rem">
                                                            {data.id_produk.nama}
                                                        </P>
                                                    </td>
                                                    <td className="text-capitalize text-nowrap">
                                                        <P color="#616161" fontsize="0.875rem">
                                                            {data.jumlahKeluar}
                                                        </P>
                                                    </td>
                                                    <td className="text-capitalize text-nowrap">
                                                        <P color="#616161" fontsize="0.875rem">
                                                            Rp {numberWithCommas(data.id_produk.harga)}
                                                        </P>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        <tr>
                                            <td colspan="2" className="text-nowrap">
                                                <H4>TOTAL</H4>
                                            </td>
                                            {dataTotalHarga !== null && (
                                                <td className="text-nowrap">
                                                    <H6>Rp {numberWithCommas(dataTotalHarga)}</H6>
                                                </td>
                                            )}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className={styles.btn_secondary_wrapper}>
                        <BtnSecondary type="button" onClick={handleBackToPrevious}>
                            Kembali
                        </BtnSecondary>
                    </div>
                </div>
            )}
        </>
    );
};

export default DetailPenjualan;
