import React from "react";
import styles from "./style.module.css";

const BtnLinkError = ({ ...props }) => {
    return (
        <>
            <button type="button" className={`btn ${styles.btn_link_error} ${props.bs}`} {...props}>
                {props.children}
            </button>
        </>
    );
};

export default BtnLinkError;
