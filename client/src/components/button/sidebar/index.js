import React from "react";
import styles from "./style.module.css";

const SidebarBtn = (props) => {
    const { button } = styles;

    return (
        <button className={`${button} w-100`} type="button">
            {props.children}
        </button>
    );
};

export default SidebarBtn;
