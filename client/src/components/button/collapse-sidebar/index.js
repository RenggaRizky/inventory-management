import React from "react";
import styles from "./style.module.css";
import { useLocation } from "react-router-dom";

const CollapseSidebar = (props) => {
    const location = useLocation();
    const pathname = location.pathname;

    return (
        <>
            <button className={`${pathname.includes(props.menu) ? styles.button_clicked : styles.button} w-100`} type="button">
                {props.children}
            </button>
        </>
    );
};

export default CollapseSidebar;
