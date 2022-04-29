import React from "react";
import styles from "./style.module.css";

const InputText = (props) => {
    const { input_text } = styles;
    return <input className={`${input_text} form-control`} type="text" placeholder={props.placeholder} aria-label="default input example" />;
};

export default InputText;
