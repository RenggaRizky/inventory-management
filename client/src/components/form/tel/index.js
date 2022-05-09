import React from "react";
import styles from "./style.module.css";

const InputTel = (props) => {
    const { input_tel } = styles;
    return <input className={`${input_tel} form-control`} type="tel" placeholder={props.placeholder} aria-label="default input example" {...props} />;
};

export default InputTel;
