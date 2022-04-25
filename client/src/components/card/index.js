import React from "react";
import styles from "./style.module.css";

const Card = (props) => {
    const { card, card_body } = styles;

    return (
        <div className={`${card} card`}>
            <div className={card_body} style={props.padding}>
                {props.children}
            </div>
        </div>
    );
};

export default Card;
