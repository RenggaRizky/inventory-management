import React from "react";
import styles from "./style.module.css";

const InputTel = (props) => {
    return <input className={`${styles.input_tel} form-control`} type="tel" placeholder={props.placeholder} aria-label="default input example" pattern="[0-9]*" {...props} />;
};

export default InputTel;
