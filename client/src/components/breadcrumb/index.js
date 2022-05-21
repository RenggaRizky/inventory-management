import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./style.module.css";

import Title from "../typography/title";

const Breadcrumb = () => {
    const location = useLocation();
    const pathname = location.pathname.split("/");
    const dashboardItem = pathname[1];

    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb m-0">
                {dashboardItem === "" ? (
                    <li className={`${styles.breadcrumb_item} me-3 text-capitalize`}>
                        <Title fontweight="700">Home</Title>
                    </li>
                ) : (
                    <li className={`${styles.breadcrumb_item} me-3 text-capitalize`}>
                        <Link to="/" className="text-decoration-none">
                            <Title>Home</Title>
                        </Link>
                    </li>
                )}
                <li className={`${styles.breadcrumb_item} d-flex text-capitalize`}>
                    <Title>{dashboardItem}</Title>
                </li>
            </ol>
        </nav>
    );
};

export default Breadcrumb;
