import React from "react";
import styles from "./style.module.css";

const BtnSubmitPrimary = (props) => {
    const { btn_primary } = styles;
    return <input type="submit" className={`btn ${btn_primary}`} value={props.value} style={props.borderRadius} {...props} />;
};

export default BtnSubmitPrimary;
