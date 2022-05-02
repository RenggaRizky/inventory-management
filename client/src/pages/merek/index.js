import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMerek } from "../../actions/merek";
import { postMerek } from "../../actions/merek";

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
import Subtitle from "../../components/typography/subtitle";
import InputText from "../../components/form/text";

const Merek = () => {
    const { modal, wrapper, search_wrapper } = styles;
    const dispatch = useDispatch();
    const merek = useSelector((state) => state.merek);
    const [postDataMerek, setPostDataMerek] = useState({
        nama: "",
    });

    const submitHandler = () => {
        dispatch(postMerek(postDataMerek));
    };
    const deleteHandler = () => {};

    useEffect(() => {
        dispatch(getMerek());
    }, [dispatch]);

    const tableHead = [
        {
            key: 1,
            title: "Merek Barang",
        },
        {
            key: 2,
            title: "Tindakan",
        },
    ];

    console.log(merek);

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
                    <BtnPrimaryModal target="tambahMerek">Tambah Merek</BtnPrimaryModal>

                    {/* modal tambah merek*/}
                    <div className={`${modal} modal fade`} id="tambahMerek" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg modal-fullscreen-lg-down">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">
                                        Tambah Merek
                                    </h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <form onSubmit={submitHandler}>
                                    <div className="modal-body my-2">
                                        <div className="mb-3">
                                            <Subtitle>Nama Merek</Subtitle>
                                            <InputText
                                                defaultValue={postDataMerek.nama}
                                                onChange={(e) =>
                                                    setPostDataMerek({
                                                        ...postDataMerek,
                                                        nama: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <BtnSecondary data-bs-dismiss="modal" onClick={deleteHandler}>
                                            Keluar
                                        </BtnSecondary>
                                        <BtnSubmitPrimary value="Simpan" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <Table tablehead={tableHead} tabledata={merek} />
                <div className="d-flex justify-content-end">
                    <Pagination />
                </div>
            </Card>
        </div>
    );
};

export default Merek;
