import React, { useState, useEffect } from "react";
import { url } from "../../api";

import BtnPrimaryModal from "../../components/button/primary-modal";
import BtnWhiteModal from "../../components/button/white-modal";
import Card from "../../components/card";
import Search from "../../components/form/search";
import styles from "./style.module.css";
import ButtonAction from "../../components/button/button-action";
import Pagination from "../../components/pagination";
import BtnPrimary from "../../components/button/primary";
import BtnSecondary from "../../components/button/secondary";
import BtnSubmitPrimary from "../../components/button/submit-primary";
import Subtitle from "../../components/typography/subtitle";
import InputText from "../../components/form/text";
import P from "../../components/typography/paragraph";

import { BiSliderAlt } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { H5 } from "../../components/typography/heading";
import Spinner from "../../components/spinner";

const Merek = () => {
    const { icon, modal, wrapper, search_wrapper, table, table_head, table_body } = styles;
    // const dispatch = useDispatch();
    // const merek = useSelector((state) => state.merek);
    const [postDataMerek, setPostDataMerek] = useState({
        nama: "",
    });

    // const submitHandler = () => {
    //     dispatch(postMerek(postDataMerek));
    // };
    // const deleteHandler = () => {};

    // useEffect(() => {
    //     dispatch(getMerek());
    // }, [dispatch]);

    const [merek, setMerek] = useState(null);
    const getMerek = async () => {
        try {
            const response = await url.get("merek");
            setMerek(response.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    // const postMerek = (merekBaru) => {
    //     api.createDataMerek(merekBaru)
    //         .then((response) => {
    //             const data = response.data;
    //             setPostDataMerek(data);
    //         })
    //         .catch((error) => {
    //             console.log(error.message);
    //         });
    // };

    const postMerek = async () => {
        try {
            const response = await url.post("merek", postDataMerek);
            setMerek(response.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        postMerek();
    };

    const deleteHandler = () => {};

    useEffect(() => {
        getMerek();
    }, []);

    const tableHead = [
        {
            key: 1,
            title: "NO",
        },
        {
            key: 2,
            title: "Merek Barang",
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

                    {/* button tambah merek trigger modal */}
                    <BtnPrimaryModal target="tambahMerek">
                        <IoMdAdd className={icon} />
                        Tambah Merek
                    </BtnPrimaryModal>

                    {/* modal tambah merek*/}
                    <div className={`${modal} modal fade`} id="tambahMerek" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-fullscreen-lg-down">
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
                                                maxLength={30}
                                                defaultValue={postDataMerek.nama}
                                                onChange={(e) =>
                                                    setPostDataMerek({
                                                        ...postDataMerek,
                                                        nama: e.target.value,
                                                    })
                                                }
                                                required={true}
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

                {/* table */}
                {merek === null ? (
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
                                {merek.map((datamerek, index) => {
                                    return (
                                        <tr key={datamerek._id}>
                                            <td style={{ width: "10%" }}>
                                                <P>{index + 1}</P>
                                            </td>
                                            <td style={{ width: "75%" }}>
                                                <P>{datamerek.nama}</P>
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

export default Merek;
