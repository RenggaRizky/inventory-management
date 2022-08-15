import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./style.module.css";

const MainContent = (props) => {
    const location = useLocation();
    const pathname = location.pathname;
    return (
        <div className={props.hamburgermenu ? styles.wrapper_d_none : styles.wrapper}>
            {/* <div className={pathname !== "/login" && pathname !== "/register" ? styles.container_public : styles.container}>{props.children}</div> */}
            <div className={pathname !== "/login" && pathname !== "/register" ? styles.container : styles.container_public}>{props.children}</div>
        </div>
    );
};

export default MainContent;
