import React from "react";
import { BiErrorCircle } from "react-icons/bi";
import styles from "./style.module.css";

const ErrorAlert = (props) => {
    return (
        <div className={`alert alert-danger alert-dismissible fade show m-0 d-flex justify-content-start align-items-center ${props.bs}`} role="alert">
            <BiErrorCircle className={styles.error_alert} />
            {props.children}
        </div>
    );
};

export { ErrorAlert };
