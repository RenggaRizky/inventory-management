import React, { useState } from "react";
import styles from "../style.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { url } from "../../../../api";

import { H3, H6 } from "../../../typography/heading";
import P from "../../../typography/paragraph";
import BtnPrimary from "../../primary";
import BtnSecondary from "../../secondary";

import { HiOutlineTrash } from "react-icons/hi";
import { BtnLinkError } from "../../link/error";
import Spinner from "../../../spinner";
import { BsCheck2 } from "react-icons/bs";
import { MdClose } from "react-icons/md";

const ModalDeleteMain = ({ selectedid, selectedmenu, setdata, ...props }) => {
    const navigate = useNavigate();
    const [responseMessage, setResponseMessage] = useState(null);

    const deleteData = (id) => {
        url.delete(`${selectedmenu}/${id}`)
            .then((response) => {
                setdata(response.data.item);
                setResponseMessage(response.data);
            })
            .catch((error) => {
                setResponseMessage(error.response.data);
            });
    };

    const handleCloseModal = () => {
        setResponseMessage(null);
        navigate(selectedmenu);
    };

    const handleDelete = (id) => {
        deleteData(id);
    };

    return (
        <>
            <BtnLinkError bs="btn text-uppercase d-flex align-items-center" data-bs-toggle="modal" data-bs-target={`#${props.target}`}>
                <HiOutlineTrash className={styles.icon_delete} />
                {props.value}
            </BtnLinkError>
            <div className={`${styles.modal} modal fade`} id={props.target} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg modal-fullscreen-lg-down">
                    <div className={`${styles.modal_content} modal-content`}>
                        <div className={`${styles.modal_header} modal-header`}>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalDelete"></button>
                        </div>
                        <div className={`${styles.modal_body} modal-body text-center mb-5`}>
                            <div className={`${styles.icon_wrapper} ${styles.icon_delete_wrapper} rounded-circle`}>
                                <HiOutlineTrash className={styles.icon_delete_primary} />
                            </div>
                            <H3 className="text-uppercase" margin="1rem">
                                Apakah kamu yakin ingin <br /> menghapus {props.page} ini secara permanen?
                            </H3>
                            <P>Data yang sudah terhapus tidak akan bisa dikembalikan lagi</P>
                        </div>
                        <div className={`${styles.modal_footer} modal-footer`}>
                            <BtnSecondary type="button" data-bs-dismiss="modal">
                                Batal
                            </BtnSecondary>
                            <BtnPrimary type="button" onClick={() => handleDelete(selectedid)} data-bs-toggle="modal" data-bs-target={`#${props.target}Response`}>
                                Hapus
                            </BtnPrimary>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${styles.modal} modal fade`} id={`${props.target}Response`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg modal-fullscreen-lg-down">
                    <div className="modal-content">
                        <div className={`${styles.modal_header} modal-header`}>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalDelete" onClick={handleCloseModal}></button>
                        </div>
                        <div className={`${styles.modal_body} modal-body text-center mb-5`}>
                            {responseMessage === null ? (
                                <Spinner />
                            ) : (
                                <div className="mb-5">
                                    {responseMessage.message === "Berhasil menghapus" ? (
                                        <>
                                            <div className={`${styles.icon_wrapper} ${styles.icon_checked_wrapper} rounded-circle`}>
                                                <BsCheck2 className={styles.icon_checked_primary} />
                                            </div>
                                            <H3 className="text-uppercase" margin="1rem">
                                                {responseMessage.message} {props.page}
                                            </H3>
                                        </>
                                    ) : (
                                        <>
                                            <div className={`${styles.icon_wrapper} ${styles.icon_delete_wrapper} rounded-circle`}>
                                                <MdClose className={styles.icon_delete_primary} />
                                            </div>
                                            <H3 className="text-uppercase" margin="1rem">
                                                {responseMessage.message} {props.page}
                                            </H3>
                                            <P>{props.page} ini masih tertaut dengan data yang lain</P>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalDeleteMain;
