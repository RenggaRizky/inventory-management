import React from "react";
import styles from "./style.module.css";

const MainContent = (props) => {
    const { wrapper, container } = styles;

    return (
        <div className={wrapper}>
            <div className={container}>{props.children}</div>
        </div>
    );
};

export default MainContent;
