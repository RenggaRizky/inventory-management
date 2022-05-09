import React, { useEffect, useState } from "react";
import { url } from "../../api";

import BtnPrimaryModal from "../../components/button/primary-modal";
import BtnWhiteModal from "../../components/button/white-modal";
import Card from "../../components/card";
import Search from "../../components/form/search";
import styles from "./style.module.css";
import Pagination from "../../components/pagination";
import BtnPrimary from "../../components/button/primary";
import BtnSecondary from "../../components/button/secondary";
import BtnSubmitPrimary from "../../components/button/submit-primary";
import InputSelect from "../../components/form/select";
import Subtitle from "../../components/typography/subtitle";
import DisableForm from "../../components/form/disable";
import InputNumber from "../../components/form/number";
import ButtonAction from "../../components/button/button-action";
import { H5 } from "../../components/typography/heading";
import P from "../../components/typography/paragraph";
import Spinner from "../../components/spinner";

import { IoMdAdd } from "react-icons/io";
import { BiSliderAlt } from "react-icons/bi";
import InputText from "../../components/form/text";
import Caption from "../../components/typography/caption";

const Produk = () => {
    const { modal, wrapper, search_wrapper, table, table_head, table_body, icon } = styles;
    const [postDataProduk, setPostDataProduk] = useState({
        nama: "",
    });
    const [produk, setProduk] = useState(null);

    const getProduk = async () => {
        try {
            const response = await url.get("produk");
            setProduk(response.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    const submitHandler = () => {
        // dispatch(postProduk(postDataProduk));
    };

    const deleteHandler = () => {};

    useEffect(() => {
        getProduk();
    }, []);

    const tableHead = [
        {
            key: 1,
            title: "NO",
        },
        {
            key: 2,
            title: "Nama Barang",
        },
        {
            key: 3,
            title: "Jenis Barang",
        },
        {
            key: 4,
            title: "Merek Barang",
        },
        {
            key: 5,
            title: "Harga Satuan",
        },
        {
            key: 6,
            title: "Harga Per Lusin",
        },
        {
            key: 7,
            title: (
                <>
                    Volume (mm<sup>3</sup>)
                </>
            ),
        },
        {
            key: 8,
            title: "",
        },
    ];

    return (
        <div className={wrapper}>
            <Card padding={{ padding: "35px 28px" }}>
                <div className={`${search_wrapper} d-flex justify-content-between`}>
                    <div className="d-flex justify-content-between w-50">
                        <Search />

                        {/* button filter trigger modal */}
                        <BtnWhiteModal target="filter">
                            <BiSliderAlt />
                        </BtnWhiteModal>

                        {/* filter modal */}
                        <div className={`${modal} modal fade`} id="filter" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-sm modal-fullscreen-lg-down">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">
                                            Filter
                                        </h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">...</div>
                                    <div className="modal-footer">
                                        <BtnSecondary data-bs-dismiss="modal">Keluar</BtnSecondary>
                                        <BtnPrimary>Terapkan</BtnPrimary>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* button tambah produk trigger modal */}
                    <BtnPrimaryModal target="tambahProduk">
                        <IoMdAdd className={icon} />
                        Tambah Produk
                    </BtnPrimaryModal>

                    {/* modal tambah produk*/}
                    <div className={`${modal} modal fade`} id="tambahProduk" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog  modal-fullscreen-lg-down ">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">
                                        Tambah Produk
                                    </h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <form>
                                    <div className="modal-body my-2">
                                        <div className="mb-3">
                                            <Subtitle>Nama Produk</Subtitle>
                                            <InputText MaxLength={50} required={true} />
                                        </div>
                                        <div className="mb-3">
                                            <Subtitle>Nama Jenis Barang</Subtitle>
                                            <InputSelect required={true} />
                                            <Caption color="#D84315" fontSize="0.75rem" margin="0.375rem 0 0 0" padding="0 0 0 0.375rem">
                                                *Jika jenis barang yang ingin dipilih tidak ditemukan, maka pergi ke halaman 'Jenis Barang' di bagian 'Produk'
                                            </Caption>
                                        </div>
                                        <div className="mb-3">
                                            <Subtitle>Nama Merek Barang</Subtitle>
                                            <InputSelect required={true} />
                                            <Caption color="#D84315" fontSize="0.75rem" margin="0.375rem 0 0 0" padding="0 0 0 0.375rem">
                                                *Jika merek yang ingin dipilih tidak ditemukan, maka pergi ke halaman 'Merek' di bagian 'Produk'
                                            </Caption>
                                        </div>
                                        <div className="d-flex justify-content-between mb-3 ">
                                            <div className="w-100 me-3">
                                                <Subtitle>Harga Satuan (Rp)</Subtitle>
                                                <InputNumber min={0} max={3000} />
                                            </div>
                                            <div className="w-100">
                                                <Subtitle>Harga Per Lusin (Rp)</Subtitle>
                                                <InputNumber min={0} max={3000} />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <div className="d-flex justify-content-between mb-3">
                                                <div className="w-100">
                                                    <Subtitle>Panjang (cm)</Subtitle>
                                                    <InputNumber min={0} max={3000} />
                                                </div>
                                                <div className="w-100 mx-4">
                                                    <Subtitle>Lebar (cm)</Subtitle>
                                                    <InputNumber min={0} max={3000} />
                                                </div>
                                                <div className="w-100">
                                                    <Subtitle>Tinggi (cm)</Subtitle>
                                                    <InputNumber min={0} max={3000} />
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <Subtitle>
                                                    Volume Barang (m<sup>3</sup>)
                                                </Subtitle>
                                                <DisableForm />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <BtnSecondary data-bs-dismiss="modal">Keluar</BtnSecondary>
                                        <BtnSubmitPrimary value="Simpan" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* table */}
                {produk === null ? (
                    <Spinner />
                ) : (
                    <div className="table-responsive">
                        <table className={`${table} table  align-middle`}>
                            <thead className={table_head}>
                                <tr className="align-middle">
                                    {tableHead.map((th) => {
                                        return (
                                            <th scope="col" key={th.key}>
                                                <H5>{th.title}</H5>
                                            </th>
                                        );
                                    })}
                                </tr>
                            </thead>
                            <tbody className={table_body}>
                                {produk.map((dataProduk, index) => {
                                    return (
                                        <tr key={dataProduk._id}>
                                            <td>
                                                <P>{index + 1}</P>
                                            </td>
                                            <td>
                                                <P>{dataProduk.nama}</P>
                                            </td>
                                            <td>
                                                <P>{dataProduk.id_jenisbarang[0].nama}</P>
                                            </td>
                                            <td>
                                                <P>{dataProduk.id_merek[0].nama}</P>
                                            </td>
                                            <td>
                                                <P>{dataProduk.harga.hargaSatuan}</P>
                                            </td>
                                            <td>
                                                <P>{dataProduk.harga.hargaPerLusin}</P>
                                            </td>
                                            <td>
                                                <P>{dataProduk.volume.$numberDecimal}</P>
                                            </td>
                                            <td>
                                                <ButtonAction type="update" tooltipTitle="perbarui data" />
                                                <ButtonAction type="delete" tooltipTitle="hapus data" />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
                <div className="d-flex justify-content-end">
                    <Pagination />
                </div>
            </Card>
        </div>
    );
};

export default Produk;
