import React from "react";
import styles from "./style.module.css";

const InputNumber = (props) => {
    return <input className={`${styles.input_number} form-control`} type="number" aria-label="default input example" min={props.min} max={props.max} {...props} />;
};

export default InputNumber;
