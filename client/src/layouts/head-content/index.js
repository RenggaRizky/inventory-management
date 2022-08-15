import React from "react";
import styles from "./style.module.css";
import { H1 } from "../../components/typography/heading";
import Subtitle from "../../components/typography/subtitle";

const HeadContent = ({ length, item, ...props }) => {
    return (
        <div className="d-flex w-100 justify-content-between  mb-3">
            <div className={styles.row}>
                <div className="flex-grow-1">
                    <H1>{props.title}</H1>
                    <Subtitle>{props.subtitle}</Subtitle>
                </div>
                <div className={`${styles.children} flex-grow-1`}>{props.children}</div>
            </div>
        </div>
    );
};

export default HeadContent;
