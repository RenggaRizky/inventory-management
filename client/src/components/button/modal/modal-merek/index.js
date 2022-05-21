import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import { colors } from "../../../../colors";
import { url } from "../../../../api";

import { IoMdAdd } from "react-icons/io";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { H3, H6 } from "../../../typography/heading";
import BtnPrimary from "../../primary";
import BtnSecondary from "../../secondary";
import InputText from "../../../form/text";
import Title from "../../../typography/title";

const ModalMerek = ({ merek, setmerek, currentid, setcurrentid, ...props }) => {
    const [initialDataMerek, setInitialDataMerek] = useState([]);
    const [dataMerek, setDataMerek] = useState({
        nama: "",
    });
    const [dataUpdateMerek, setDataUpdateMerek] = useState({
        nama: initialDataMerek.filter((x) => x._id === currentid).map((y) => y.nama),
    });

    const getMerek = () => {
        url.get("merek")
            .then((response) => {
                setInitialDataMerek(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const postMerek = () => {
        url.post("merek", dataMerek)
            .then((response) => {
                setmerek(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => {
                setTimeout(() => {
                    handleCloseModal();
                    setDataMerek({ ...dataMerek, nama: "" });
                    handleClear();
                }, 100);
            });
    };

    const handleClear = () => {
        document.getElementById("inputMerek").value = "";
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postMerek();
    };

    const handleCloseModal = () => {
        document.getElementById("closeModalAddEditMerek").click();
    };

    useEffect(() => {
        getMerek();
    }, []);

    return (
        <>
            {props.type === "add" ? (
                <button type="button" className={`${styles.btn_modal_add} btn`} data-bs-toggle="modal" data-bs-target={`#${props.target}`}>
                    <IoMdAdd className={styles.icon_add} />
                    {props.value} Merek
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
                                {props.value} Merek
                            </H3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalAddEditMerek" onClick={handleClear}></button>
                        </div>
                        <form onSubmit={handleSubmit} id="formInputMerek">
                            <div className={`${styles.modal_body} modal-body`}>
                                <label htmlFor="inputMerek">
                                    <Title margin="0 0 0.625rem 0.25rem">Nama Merek</Title>
                                </label>
                                <InputText
                                    id="inputMerek"
                                    defaultValue={props.type === "add" ? dataMerek.nama : initialDataMerek.filter((x) => x._id === currentid).map((y) => y.nama)}
                                    onChange={props.type === "add" ? (e) => setDataMerek({ ...dataMerek, nama: e.target.value }) : (e) => setDataUpdateMerek({ ...dataUpdateMerek, nama: e.target.value })}
                                    maxLength={30}
                                    required
                                />
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

export default ModalMerek;
