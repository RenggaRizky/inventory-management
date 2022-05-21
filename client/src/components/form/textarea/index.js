import React from "react";
import styles from "./style.module.css";

const Textarea = (props) => {
    return (
        <textarea className={`${styles.textarea} form-control`} rows={props.rows} {...props}>
            {props.children}
        </textarea>
    );
};

export default Textarea;
