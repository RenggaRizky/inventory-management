import React from "react";
import styles from "./style.module.css";

const BtnSecondary = ({ ...props }) => {
    return (
        <>
            {props.type === "button" ? (
                <button type="button" className={`btn ${styles.btn_secondary} ${props.bs}`} {...props}>
                    {props.children}
                </button>
            ) : (
                <input type="submit" className={`btn ${styles.btn_secondary} ${props.bs}`} value={props.value} {...props} />
            )}
        </>
    );
};

export default BtnSecondary;
