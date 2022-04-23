import React from "react";
import styles from "./style.module.css";

const CollapseBtn = (props) => {
    const { button } = styles;

    return (
        <button className={`${button} w-100`} type="button" data-bs-toggle="collapse" data-bs-target={`#${props.target}`} aria-expanded="false" aria-controls={props.target} {...props}>
            {props.children}
        </button>
    );
};

export default CollapseBtn;
