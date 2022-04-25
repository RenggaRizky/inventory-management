import React from "react";
import styles from "./style.module.css";

const BtnWhiteModal = (props) => {
    const { btn_white } = styles;

    return (
        <button type="button" className={`${btn_white}  btn`} data-bs-toggle="modal" data-bs-target={`#${props.target}`}>
            {props.children}
        </button>
    );
};

export default BtnWhiteModal;
