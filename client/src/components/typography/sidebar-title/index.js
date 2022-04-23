import React from "react";
import styles from "./style.module.css";

const SidebarTitle = (props) => {
    return (
        <p className={styles.p} {...props}>
            {props.children}
        </p>
    );
};

export default SidebarTitle;
