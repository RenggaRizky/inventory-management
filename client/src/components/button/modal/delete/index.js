import React from "react";
import styles from "./style.module.css";
import { colors } from "../../../../colors";
import { url } from "../../../../api";

import { H3, H6 } from "../../../typography/heading";
import P from "../../../typography/paragraph";
import BtnPrimary from "../../primary";
import BtnSecondary from "../../secondary";

import { HiOutlineTrash } from "react-icons/hi";

const ModalDelete = ({ currentid, setcurrentid, setdata, deleteurl, ...props }) => {
    const deleteData = (id) => {
        url.delete(`${deleteurl}/${id}`)
            .then((response) => {
                setdata(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => {
                setTimeout(() => {
                    handleCloseModal();
                }, 100);
            });
    };

    const handleCloseModal = () => {
        document.getElementById("closeModalDelete").click();
    };

    return (
        <>
            <button type="button" className={`${styles.btn_modal_delete} btn text-uppercase d-flex`} data-bs-toggle="modal" data-bs-target={`#${props.target}`} onClick={setcurrentid}>
                <HiOutlineTrash className={styles.icon_delete} />
                <H6 color={colors.error}>{props.value}</H6>
            </button>
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
                            <BtnPrimary type="button" onClick={() => deleteData(currentid)}>
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
