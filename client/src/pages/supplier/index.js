import React, { useEffect, useState } from "react";
import { url } from "../../api";

import Spinner from "../../components/spinner";
import BtnPrimaryModal from "../../components/button/primary-modal";
import BtnWhiteModal from "../../components/button/white-modal";
import Card from "../../components/card";
import Search from "../../components/form/search";
import styles from "./style.module.css";
import P from "../../components/typography/paragraph";
import { H5 } from "../../components/typography/heading";
import Pagination from "../../components/pagination";
import BtnPrimary from "../../components/button/primary";
import BtnSecondary from "../../components/button/secondary";
import BtnSubmitPrimary from "../../components/button/submit-primary";
import InputText from "../../components/form/text";
import Subtitle from "../../components/typography/subtitle";
import ButtonAction from "../../components/button/button-action";

import { BiSliderAlt } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import InputTel from "../../components/form/tel";

const Supplier = () => {
    const { modal, wrapper, search_wrapper, table, table_head, table_body, icon } = styles;
    const [supplier, setSupplier] = useState(null);

    const getSupplier = async () => {
        try {
            const response = await url.get("/supplier");
            setSupplier(response.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getSupplier();
    }, []);

    const tableHead = [
        {
            key: 1,
            title: "NO",
        },
        {
            key: 2,
            title: "Nama Supplier",
        },
        {
            key: 3,
            title: "Alamat",
        },
        {
            key: 4,
            title: "Kontak ",
        },
        {
            key: 5,
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

                    {/* button tambah merek trigger modal */}
                    <BtnPrimaryModal target="tambahSupplier">
                        {" "}
                        <IoMdAdd className={icon} />
                        Tambah Supplier
                    </BtnPrimaryModal>

                    {/* modal tambah merek*/}
                    <div className={`${modal} modal fade`} id="tambahSupplier" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-fullscreen-lg-down">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">
                                        Tambah Supplier
                                    </h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <form>
                                    <div className="modal-body my-2">
                                        <div className="mb-3">
                                            <Subtitle>Nama Supplier</Subtitle>
                                            <InputText maxLength={30} required={true} />
                                        </div>
                                        <div className="mb-3">
                                            <Subtitle>Alamat</Subtitle>
                                            <InputText maxLength={100} required={true} />
                                        </div>
                                        <div className="mb-3">
                                            <Subtitle>Kontak</Subtitle>
                                            <InputTel
                                                pattern={/^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/g}
                                                maxLength={12}
                                                onKeyPress={(event) => {
                                                    if (!/[0-9]/.test(event.key)) {
                                                        event.preventDefault();
                                                    }
                                                }}
                                                required={true}
                                            />
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
                {supplier === null ? (
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
                                {supplier.map((datasupplier, index) => {
                                    return (
                                        <tr key={datasupplier._id} style={{ width: "10%" }}>
                                            <td>
                                                <P>{index + 1}</P>
                                            </td>
                                            <td style={{ width: "20%" }}>
                                                <P>{datasupplier.nama}</P>
                                            </td>
                                            <td style={{ width: "35%" }}>
                                                <P>{datasupplier.alamat}</P>
                                            </td>
                                            <td style={{ width: "20%" }}>
                                                <P>{datasupplier.kontak}</P>
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

export default Supplier;
