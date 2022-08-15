import React from "react";
import { Link } from "react-router-dom";
import { H1, H4 } from "../../typography/heading";
import Overline from "../../typography/overline";
import Subtitle from "../../typography/subtitle";
import styles from "../style.module.css";

const DashboardCardPrimary = ({ children, title, subtitle, date }) => {
    return (
        <div class={`${styles.db_card} card mb-3 w-100 h-100 shadow-sm`}>
            <div class="card-body text-dark d-flex flex-column justify-content-between">
                {children}
                <H1 color="#fff" fontsize="2.5rem" margin="1rem 0">
                    {title}
                </H1>
                <span className={styles.subtitle_wrapper}>
                    <Subtitle fontsize="1rem" color="#fff" margin="0 0.5rem 0 0">
                        {subtitle}
                    </Subtitle>
                    <Overline>{date}</Overline>
                </span>
            </div>
        </div>
    );
};

const DashboardCardSecondary = ({ title, children, ...props }) => {
    return (
        <div className={`${styles.list_wrapper} card border-light p-3 shadow-sm`}>
            <H4 margin="1rem 0 2rem 0">{title}</H4>
            <div>{children}</div>
            <div className="d-flex justify-content-center align-items-center"></div>
        </div>
    );
};

export { DashboardCardPrimary, DashboardCardSecondary };
