import React from "react";
import styles from "./style.module.css";

const BtnSecondary = ({ ...props }) => {
    return (
        <>
            {props.type === "button" ? (
                <button type="button" className={`${styles.btn_secondary} btn`} {...props}>
                    {props.children}
                </button>
            ) : (
                <input type="submit" className={`btn ${styles.btn_secondary}`} value={props.value} {...props} />
            )}
        </>
    );
};

export default BtnSecondary;
