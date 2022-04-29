import React from "react";
import styles from "./style.module.css";

const InputSelect = (props) => {
    const { input_select } = styles;

    return (
        <select className={`${input_select} form-select`} aria-label="Default select example">
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
        </select>
    );
};

export default InputSelect;
