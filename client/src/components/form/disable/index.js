import React from "react";
import styles from "./style.module.css";

const DisableForm = (props) => {
    const { disable_form } = styles;

    return <input className={`${disable_form} form-control`} id="disabledInput" type="text" placeholder={props.placeholder} disabled />;
};

export default DisableForm;
