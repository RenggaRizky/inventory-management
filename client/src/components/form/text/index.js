import React from "react";
import styles from "./style.module.css";

const InputText = (props) => {
    return <input className={`${styles.input_text} form-control`} type="text" placeholder={props.placeholder} aria-label="default input example" {...props} />;
};

export default InputText;
