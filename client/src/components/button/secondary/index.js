import React from "react";
import styles from "./style.module.css";

const BtnSecondary = (props) => {
    const { btn_secondary } = styles;

    return (
        <>
            <button type="button" className={`btn ${btn_secondary}`} style={props.borderRadius} {...props}>
                {props.children}
            </button>
        </>
    );
};

export default BtnSecondary;
