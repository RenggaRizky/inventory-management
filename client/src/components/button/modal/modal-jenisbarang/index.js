import React, { useState } from "react";
import { url } from "../../../../api";
import styles from "./style.module.css";
import { colors } from "../../../../colors";

import { IoMdAdd } from "react-icons/io";
import { HiOutlinePencilAlt } from "react-icons/hi";

import { H3, H6 } from "../../../typography/heading";
import Title from "../../../typography/title";
import InputText from "../../../form/text";
import BtnPrimary from "../../primary";
import BtnSecondary from "../../secondary";

const ModalJenisBarang = ({ jenisbarang, setjenisbarang, setcurrentid, ...props }) => {
    const [dataJenisBarang, setDataJenisBarang] = useState({
        nama: "",
    });

    const postJenisBarang = () => {
        url.post("jenis-barang", dataJenisBarang)
            .then((response) => {
                setjenisbarang(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => {
                setTimeout(() => {
                    handleCloseModal();
                    setDataJenisBarang({ ...dataJenisBarang, nama: "" });
                    handleClear();
                }, 100);
            });
    };

    const handleClear = () => {
        document.getElementById("inputJenisBarang").value = "";
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postJenisBarang();
    };

    const handleCloseModal = () => {
        document.getElementById("closeModalAddEditJenisBarang").click();
    };

    return (
        <>
            {props.type === "add" ? (
                <button type="button" className={`${styles.btn_modal_add} btn`} data-bs-toggle="modal" data-bs-target={`#${props.target}`}>
                    <IoMdAdd className={styles.icon_add} />
                    {props.value} Jenis Barang
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
                                {props.value} Jenis Barang
                            </H3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalAddEditJenisBarang" onClick={handleClear}></button>
                        </div>
                        <form onSubmit={handleSubmit} id="formInputJenisBarang">
                            <div className={`${styles.modal_body} modal-body`}>
                                <label htmlFor="inputJenisBarang">
                                    <Title margin="0 0 0.625rem 0.25rem">Nama Jenis Barang</Title>
                                </label>
                                <InputText id="inputJenisBarang" defaultValue={dataJenisBarang.nama} onChange={(e) => setDataJenisBarang({ ...dataJenisBarang, nama: e.target.value })} maxLength={30} required />
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

export default ModalJenisBarang;
