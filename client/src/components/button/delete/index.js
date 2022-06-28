import React from "react";
import styles from "./style.module.css";

const BtnDelete = ({ ...props }) => {
    return (
        <>
            {props.type === "button" ? (
                <button type="button" className={`btn ${styles.btn_delete} ${props.bs}`} bs={props.bs} {...props}>
                    {props.children}
                </button>
            ) : (
                <input type="submit" className={`btn ${styles.btn_delete} ${props.bs}`} bs={props.bs} value={props.value} {...props} />
            )}
        </>
    );
};

export default BtnDelete;
