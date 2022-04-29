import React from "react";
import styles from "./style.module.css";

const InputNumber = (props) => {
    const { input_number } = styles;
    const maxLengthInputNumber = (value) => {
        if (value > 4) {
            value = value.substring(0, 4);
        }
    };

    return <input className={`${input_number} form-control`} type="number" aria-label="default input example" min={props.min} max={props.max} onInput={maxLengthInputNumber} />;
};

export default InputNumber;
