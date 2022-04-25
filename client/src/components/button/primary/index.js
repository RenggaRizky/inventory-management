import React from "react";
import styles from "./style.module.css";

const BtnPrimary = (props) => {
    const { btn_primary } = styles;

    return (
        <button type="button" className={`btn ${btn_primary}`} style={props.borderRadius} {...props}>
            {props.children}
        </button>
    );
};

export default BtnPrimary;
