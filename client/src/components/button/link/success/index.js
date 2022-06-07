import React from "react";
import styles from "./style.module.css";

const BtnLinkSuccess = ({ ...props }) => {
    return (
        <>
            <button type="button" className={`btn ${styles.btn_link_success} ${props.bs}`} {...props}>
                {props.children}
            </button>
        </>
    );
};

export default BtnLinkSuccess;
