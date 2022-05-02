import React from "react";
import BtnPrimaryModal from "../../components/button/primary-modal";
import BtnWhiteModal from "../../components/button/white-modal";
import Card from "../../components/card";
import Search from "../../components/form/search";
import styles from "./style.module.css";

import { BiSliderAlt } from "react-icons/bi";
import Table from "../../components/table";
import Pagination from "../../components/pagination";
import BtnPrimary from "../../components/button/primary";
import BtnSecondary from "../../components/button/secondary";
import BtnSubmitPrimary from "../../components/button/submit-primary";
import InputSelect from "../../components/form/select";
import Subtitle from "../../components/typography/subtitle";
import DisableForm from "../../components/form/disable";
import InputNumber from "../../components/form/number";

const Produk = () => {
    const { modal, wrapper, search_wrapper } = styles;

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
                    <BtnPrimaryModal target="tambahProduk">Tambah Produk</BtnPrimaryModal>

                    {/* modal tambah produk*/}
                    <div className={`${modal} modal fade`} id="tambahProduk" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg modal-fullscreen-lg-down">
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
                                            <InputSelect />
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
                                            <Subtitle>Jumlah Stok</Subtitle>
                                            <InputNumber min={0} max={3000} />
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

                <Table />
                <div className="d-flex justify-content-end">
                    <Pagination />
                </div>
            </Card>
        </div>
    );
};

export default Produk;
