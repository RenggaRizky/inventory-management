import React from "react";
import styles from "./style.module.css";

const MainContent = (props) => {
    const { wrapper, wrapper_d_none, container } = styles;

    return (
        <div className={props.hamburgermenu ? wrapper_d_none : wrapper}>
            <div className={container}>{props.children}</div>
        </div>
    );
};

export default MainContent;
