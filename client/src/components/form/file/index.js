import React from "react";
import styles from "./style.module.css";

const InputFile = (props) => {
    // return <input className={` ${styles.input_file} form-control form-control-lg`} type="file" placeholder={props.placeholder} {...props} />;
    return (
        <div className={`${styles.custom_input_file} input-group`}>
            <label className={`${styles.input_group_wrapper} input-group-text`} htmlFor={props.id}>
                Pilih Gambar
            </label>
            <input type="file" className={`${styles.input_file} form-control`} {...props} />
        </div>
    );
};

export default InputFile;
