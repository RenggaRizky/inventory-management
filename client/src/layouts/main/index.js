import React from "react";
import styles from "./style.module.css";

const MainContent = (props) => {
    return (
        <div className={props.hamburgermenu ? styles.wrapper_d_none : styles.wrapper}>
            <div className={styles.container}>{props.children}</div>
        </div>
    );
};

export default MainContent;
