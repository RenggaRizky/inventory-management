import moment from "moment";
import React, { useEffect, useState } from "react";
import { url } from "../../api";
import MainCard from "../../components/card/main";
import Divider from "../../components/divider";
import Search from "../../components/form/search";
import Spinner from "../../components/spinner";
import { H6 } from "../../components/typography/heading";
import P from "../../components/typography/paragraph";
import Subtitle from "../../components/typography/subtitle";
import HeadContent from "../../layouts/head-content";
import styles from "./style.module.css";

const BarangKeluar = () => {
    const [dataBarangKeluar, setDataBarangKeluar] = useState(null);

    const tableHead = [
        { key: 1, title: "Tanggal" },
        { key: 2, title: "Produk" },
        { key: 3, title: "Jumlah" },
    ];

    const getBarangKeluar = () => {
        url.get(`/barang-keluar`)
            .then((response) => {
                setDataBarangKeluar(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    useEffect(() => {
        getBarangKeluar();
    }, []);

    console.log(dataBarangKeluar);

    return (
        <div className={styles.wrapper}>
            <MainCard>
                <HeadContent title="Barang Keluar" subtitle="Kumpulan data mengenai barang yang keluar">
                    <div className={`${styles.action_wrapper} d-flex justify-content-between align-items-center`}>
                        <div className="flex-grow-1 me-3">
                            <Search placeholder="Cari Barang" />
                        </div>
                    </div>
                </HeadContent>
                <Divider margin="0 0 24px 0" />

                <>
                    {dataBarangKeluar === null ? (
                        <Spinner />
                    ) : (
                        <table className={`${styles.table} table`}>
                            <thead className={styles.table_head}>
                                <tr className="align-middle">
                                    {tableHead.map((data) => {
                                        return (
                                            <th scope="col" key={data.key} className="text-wrap text-uppercase">
                                                <H6 fontsize="0.75rem" color="#6B7280" fontweight="600">
                                                    {data.title}
                                                </H6>
                                            </th>
                                        );
                                    })}
                                </tr>
                            </thead>
                            <tbody className={styles.table_body}>
                                {dataBarangKeluar.map((x) => {
                                    return (
                                        <>
                                            {x.barangKeluar.map((y) => {
                                                return (
                                                    <tr>
                                                        <td className="text-capitalize">
                                                            <P color="#616161" fontsize="0.75rem">
                                                                {moment(y.tanggalKeluar).format("LL")}
                                                            </P>
                                                        </td>
                                                        <td className="d-flex align-items-center">
                                                            <img src={`data:image/png;base64, ${y.id_produk.gambar}`} alt={y.id_produk.nama} className={styles.product_picture} />
                                                            <div className="ms-3">
                                                                <H6 className="text-uppercase">{y.id_produk.nama}</H6>
                                                                <Subtitle
                                                                    fontsize="0.75rem"
                                                                    lineheight="15px"
                                                                >{`Dimensi ${y.id_produk.dimensi.panjang.$numberDecimal} x ${y.id_produk.dimensi.lebar.$numberDecimal} x ${y.id_produk.dimensi.tinggi.$numberDecimal}`}</Subtitle>
                                                            </div>
                                                        </td>
                                                        <td className="text-capitalize">
                                                            <P color="#616161" fontsize="0.75rem">
                                                                {y.jumlahKeluar}
                                                            </P>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </>
            </MainCard>
        </div>
    );
};

export default BarangKeluar;
