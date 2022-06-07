import React from "react";
import styles from "./style.module.css";

const BtnLight = ({ ...props }) => {
    return (
        <>
            <button type="button" className={`btn ${styles.btn_light} ${props.bs}`} {...props}>
                {props.children}
            </button>
        </>
    );
};

export default BtnLight;
