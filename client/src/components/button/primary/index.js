import React from "react";
import styles from "./style.module.css";

const BtnPrimary = ({ ...props }) => {
    return (
        <>
            {props.type === "button" ? (
                <button type="button" className={`${styles.btn_primary} btn`} {...props}>
                    {props.children}
                </button>
            ) : (
                <input type="submit" className={`btn ${styles.btn_primary}`} value={props.value} {...props} />
            )}
        </>
    );
};

export default BtnPrimary;
