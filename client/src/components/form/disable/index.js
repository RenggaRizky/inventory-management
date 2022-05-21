import React from "react";
import styles from "./style.module.css";

const DisableForm = (props) => {
    return <input className={`${styles.disable_form} form-control`} id={props.id} type={props.type} placeholder={props.placeholder} readOnly {...props} />;
};

export default DisableForm;
