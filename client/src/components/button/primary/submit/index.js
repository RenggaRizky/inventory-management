import React from "react";
import styles from "../style.module.css";

const BtnPrimarySubmit = ({ ...props }) => {
    return (
        <button type="submit" className={`btn ${styles.btn_primary} ${props.bs}`} form={props.form} {...props}>
            {props.children}
        </button>
    );
};

export default BtnPrimarySubmit;
