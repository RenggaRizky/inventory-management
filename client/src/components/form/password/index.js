import React from "react";
import styles from "./style.module.css";

const InputPassword = (props) => {
    return <input className={`${styles.input_password} form-control`} type="password" placeholder={props.placeholder} aria-label="default input example" autoComplete="on" {...props} />;
};

export default InputPassword;
