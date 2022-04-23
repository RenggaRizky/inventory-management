import React from "react";
import styles from "./style.module.css";

const CollapseSidebar = (props) => {
    const { button } = styles;

    return (
        <>
            <button className={`${button} w-100`} type="button">
                <li>{props.children}</li>
            </button>
        </>
    );
};

export default CollapseSidebar;
