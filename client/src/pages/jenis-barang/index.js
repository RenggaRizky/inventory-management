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
import InputText from "../../components/form/text";

const JenisBarang = () => {
    const { modal, wrapper, search_wrapper } = styles;

    const tableHead = [
        {
            key: 1,
            title: "Nama Jenis Barang",
        },
        {
            key: 2,
            title: "Merek Barang",
        },
        {
            key: 3,
            title: "Ukuran Barang",
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
                    <BtnPrimaryModal target="tambahJenisBarang">Tambah Jenis Barang</BtnPrimaryModal>

                    {/* modal tambah produk*/}
                    <div className={`${modal} modal fade`} id="tambahJenisBarang" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg modal-fullscreen-lg-down">
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
                                            <InputText />
                                        </div>
                                        <div className="mb-3">
                                            <Subtitle>Merek Yang Tersedia</Subtitle>
                                            <InputSelect />
                                        </div>
                                        <div className="mb-3">
                                            <Subtitle>Ukuran Barang</Subtitle>
                                            <InputSelect />
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

                <Table tablehead={tableHead} tabledata={[]} />
                <div className="d-flex justify-content-end">
                    <Pagination />
                </div>
            </Card>
        </div>
    );
};

export default JenisBarang;
