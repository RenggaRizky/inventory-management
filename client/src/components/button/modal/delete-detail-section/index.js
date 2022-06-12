import React, { useState } from "react";
import styles from "../style.module.css";
import { useNavigate } from "react-router-dom";
import { url } from "../../../../api";

import { H3, H6 } from "../../../typography/heading";
import P from "../../../typography/paragraph";
import BtnPrimary from "../../primary";
import BtnSecondary from "../../secondary";

import { HiOutlineTrash } from "react-icons/hi";
import BtnLinkError from "../../link/error";

const ModalDelete = ({ selectedid, selectedmenu, ...props }) => {
    const navigate = useNavigate();
    const deleteData = (id) => {
        url.delete(`${id}`)
            .then((response) => {})
            .catch((error) => {
                console.log(error.message);
            });
    };

    const handleCloseModal = () => {
        document.getElementById("closeModalDelete").click();
    };

    const handleDelete = (id) => {
        deleteData(id);
        setTimeout(() => {
            handleCloseModal();
            navigate(selectedmenu);
        }, 100);
    };

    return (
        <>
            <BtnLinkError bs="btn text-uppercase d-flex align-items-center" data-bs-toggle="modal" data-bs-target={`#${props.target}`}>
                <HiOutlineTrash className={styles.icon_delete} />
                {props.value}
            </BtnLinkError>
            <div className={`${styles.modal} modal fade`} id={props.target} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg modal-fullscreen-lg-down">
                    <div className="modal-content">
                        <div className={`${styles.modal_header} modal-header`}>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalDelete"></button>
                        </div>
                        <div className={`${styles.modal_body} modal-body text-center mb-5`}>
                            <div className={`${styles.icon_wrapper} rounded-circle`}>
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
                            <BtnPrimary type="button" onClick={() => handleDelete(selectedid)}>
                                Hapus
                            </BtnPrimary>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalDelete;
