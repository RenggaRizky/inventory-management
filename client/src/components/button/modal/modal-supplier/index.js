import React, { useState } from "react";
import { url } from "../../../../api";
import styles from "./style.module.css";
import { colors } from "../../../../colors";

import { IoMdAdd } from "react-icons/io";
import { HiOutlinePencilAlt } from "react-icons/hi";

import { H3, H6 } from "../../../typography/heading";
import Title from "../../../typography/title";
import InputText from "../../../form/text";
import BtnSecondary from "../../secondary";
import BtnPrimary from "../../primary";
import InputTel from "../../../form/tel";
import Textarea from "../../../form/textarea";

const ModalSupplier = ({ supplier, setsupplier, setcurrentid, ...props }) => {
    const [dataSupplier, setDataSupplier] = useState({
        nama: "",
        kontak: "",
        alamat: "",
    });

    const postSupplier = () => {
        url.post("supplier", dataSupplier)
            .then((response) => {
                setsupplier(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => {
                setTimeout(() => {
                    handleCloseModal();
                    setDataSupplier({ nama: "", kontak: "", alamat: "" });
                    handleClear();
                }, 100);
            });
    };

    const handleClear = () => {
        document.getElementById("inputNamaSupplier").value = "";
        document.getElementById("inputKontakSupplier").value = "";
        document.getElementById("inputAlamatSupplier").value = "";
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postSupplier();
    };

    const handleCloseModal = () => {
        document.getElementById("closeModalAddEditSupplier").click();
    };

    return (
        <>
            {props.type === "add" ? (
                <button type="button" className={`${styles.btn_modal_add} btn`} data-bs-toggle="modal" data-bs-target={`#${props.target}`}>
                    <IoMdAdd className={styles.icon_add} />
                    {props.value} Supplier
                </button>
            ) : (
                <button type="button" className={`${styles.btn_modal_edit} btn text-uppercase d-flex`} data-bs-toggle="modal" data-bs-target={`#${props.target}`} onClick={setcurrentid}>
                    <HiOutlinePencilAlt className={styles.icon_edit} />
                    <H6 color={colors.success}>{props.value}</H6>
                </button>
            )}
            <div className={`${styles.modal} modal fade`} id={props.target} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg modal-fullscreen-lg-down">
                    <div className="modal-content">
                        <div className={`${styles.modal_header} modal-header`}>
                            <H3 className="modal-title text-uppercase" id="staticBackdropLabel">
                                {props.value} Supplier
                            </H3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalAddEditSupplier" onClick={handleClear}></button>
                        </div>
                        <form onSubmit={handleSubmit} id="formInputSupplier">
                            <div className={`${styles.modal_body} modal-body`}>
                                <label htmlFor="inputNamaSupplier">
                                    <Title margin="0.875rem 0 0.625rem 0.25rem">Nama Supplier</Title>
                                </label>
                                <InputText id="inputNamaSupplier" defaultValue={dataSupplier.nama} onChange={(e) => setDataSupplier({ ...dataSupplier, nama: e.target.value })} maxLength={50} required />
                                <label htmlFor="inputKontakSupplier">
                                    <Title margin="0.875rem 0 0.625rem 0.25rem">Kontak</Title>
                                </label>
                                <InputTel id="inputKontakSupplier" defaultValue={dataSupplier.kontak} onChange={(e) => setDataSupplier({ ...dataSupplier, kontak: e.target.value })} maxLength={12} required />
                                <label htmlFor="inputAlamatSupplier">
                                    <Title margin="0.875rem 0 0.625rem 0.25rem">Alamat</Title>
                                </label>
                                <Textarea id="inputAlamatSupplier" defaultValue={dataSupplier.alamat} onChange={(e) => setDataSupplier({ ...dataSupplier, alamat: e.target.value })} maxLength={12} rows={8} required />
                            </div>
                            <div className={`${styles.modal_footer} modal-footer`}>
                                <BtnSecondary type="button" data-bs-dismiss="modal" onClick={handleClear}>
                                    Batal
                                </BtnSecondary>
                                <BtnPrimary type="submit" value="simpan" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalSupplier;
