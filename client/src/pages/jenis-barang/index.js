import React, { useState, useEffect } from "react";
import { url } from "../../api";

import BtnPrimaryModal from "../../components/button/primary-modal";
import BtnWhiteModal from "../../components/button/white-modal";
import Card from "../../components/card";
import Search from "../../components/form/search";
import Spinner from "../../components/spinner";
import styles from "./style.module.css";

import { BiSliderAlt } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";

import Pagination from "../../components/pagination";
import BtnPrimary from "../../components/button/primary";
import BtnSecondary from "../../components/button/secondary";
import BtnSubmitPrimary from "../../components/button/submit-primary";
import InputSelect from "../../components/form/select";
import Subtitle from "../../components/typography/subtitle";
import InputText from "../../components/form/text";
import { H5 } from "../../components/typography/heading";
import P from "../../components/typography/paragraph";
import ButtonAction from "../../components/button/button-action";

const JenisBarang = () => {
    const { modal, wrapper, search_wrapper, table, table_head, table_body, icon } = styles;
    const [postDataJenisBarang, setPostDataJenisBarang] = useState({
        nama: "",
    });
    const [jenisBarang, setJenisBarang] = useState(null);

    const getJenisBarang = async () => {
        const response = await url.get("jenis-barang");
        setJenisBarang(response.data);
    };

    const submitHandler = () => {
        // dispatch(postJenisBarang(postDataJenisBarang));
    };

    useEffect(() => {
        getJenisBarang();
    }, []);

    const tableHead = [
        {
            key: 1,
            title: "NO",
        },
        {
            key: 2,
            title: "Jenis Barang",
        },
        {
            key: 3,
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
                    <BtnPrimaryModal target="tambahJenisBarang">
                        <IoMdAdd className={icon} />
                        Tambah Jenis Barang
                    </BtnPrimaryModal>

                    {/* modal tambah produk*/}
                    <div className={`${modal} modal fade`} id="tambahJenisBarang" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog  modal-fullscreen-lg-down">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">
                                        Tambah Jenis Barang
                                    </h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <form>
                                    <div className="modal-body my-2">
                                        <div className="mb-3">
                                            <Subtitle>Nama Jenis Barang</Subtitle>
                                            <InputText maxLength={15} required={true} />
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
                {jenisBarang === null ? (
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
                                {jenisBarang.map((dataJenisBarang, index) => {
                                    return (
                                        <tr key={dataJenisBarang._id}>
                                            <td style={{ width: "10%" }}>
                                                <P>{index + 1}</P>
                                            </td>
                                            <td style={{ width: "75%" }}>
                                                <P>{dataJenisBarang.nama}</P>
                                            </td>
                                            <td style={{ width: "15%", textAlign: "center" }}>
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

export default JenisBarang;
