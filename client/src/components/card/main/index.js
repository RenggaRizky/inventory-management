import React from "react";
import styles from "../style.module.css";

const MainCard = (props) => {
    return (
        <div className={`${styles.card} card`}>
            <div className={styles.card_body_content}>{props.children}</div>
        </div>
    );
};

export default MainCard;
