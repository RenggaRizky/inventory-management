import React from "react";
import styles from "../style.module.css";

const BtnPrimarySubmit = ({ ...props }) => {
    return (
        <button type="submit" className={`${styles.btn_primary} btn`} form={props.form} {...props}>
            {props.children}
        </button>
    );
};

export default BtnPrimarySubmit;
