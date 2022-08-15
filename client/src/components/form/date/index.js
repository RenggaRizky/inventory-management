import React, { useEffect, useState } from "react";
import styles from "./style.module.css";

const InputDate = (props) => {
    const disableDate = () => {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();
        if (dd < 10) {
            dd = "0" + dd;
        }

        if (mm < 10) {
            mm = "0" + mm;
        }
        return (today = yyyy + "-" + mm + "-" + dd);
    };

    return <input className={`${styles.input_date} form-control`} type="date" placeholder={props.placeholder} aria-label="default input example" {...props} />;
};

export default InputDate;
