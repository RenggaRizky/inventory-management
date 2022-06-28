import React from "react";
import styles from "./style.module.css";

const InputDate = (props) => {
    return <input className={`${styles.input_date} form-control`} type="date" placeholder={props.placeholder} aria-label="default input example" {...props} />;
};

export default InputDate;
