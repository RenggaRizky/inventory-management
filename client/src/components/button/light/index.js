import React from "react";
import styles from "./style.module.css";

const BtnLight = (props) => {
    const { btn_light } = styles;

    return (
        <>
            <button type="button" className={`btn ${btn_light}`} {...props}>
                {props.children}
            </button>
        </>
    );
};

export default BtnLight;
