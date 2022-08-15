import React from "react";
import styles from "./style.module.css";

const BtnGrey = (props) => {
    return (
        <>
            <button type="button" className={`btn ${styles.btn_grey} ${props.bs}`} {...props}>
                {props.children}
            </button>
        </>
    );
};

export default BtnGrey;
