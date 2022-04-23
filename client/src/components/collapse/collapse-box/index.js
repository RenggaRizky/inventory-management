import React from "react";
import styles from "./style.module.css";

const CollapseBox = (props) => {
    return (
        <div className="collapse" id={props.target}>
            {props.children}
        </div>
    );
};

export default CollapseBox;
