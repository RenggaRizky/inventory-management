import React from "react";
import styles from "./style.module.css";

const SidebarSubtitle = (props) => {
    return (
        <p className={styles.p} {...props}>
            {props.children}
        </p>
    );
};

export default SidebarSubtitle;
