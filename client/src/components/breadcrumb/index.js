import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./style.module.css";

import { RiDashboardFill } from "react-icons/ri";

import Title from "../typography/title";

const Breadcrumb = ({ length, item, ...props }) => {
    const location = useLocation();
    const route = location.pathname.split("/");
    // eslint-disable-next-line no-unused-vars
    const [dashboardItemA, dashboardItemB, dashboardItemC] = route;

    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb m-0">
                {length === 2 && (
                    <>
                        <li className={`${styles.breadcrumb_item} ${styles.breadcrumb_item_active} me-2 text-capitalize`}>
                            <Link to="/" className="text-decoration-none d-flex align-items-center">
                                <Title color="#6B7280">Dashboard</Title>
                            </Link>
                        </li>
                        <li className={`${styles.breadcrumb_item} d-flex text-capitalize`}>
                            <Title color="#6B7280">{item.first}</Title>
                        </li>
                    </>
                )}

                {length === 3 && (
                    <>
                        <li className={`${styles.breadcrumb_item} ${styles.breadcrumb_item_active}  me-2 text-capitalize`}>
                            <Link to="/" className="text-decoration-none d-flex align-items-center">
                                <Title color="#6B7280">Dashboard</Title>
                            </Link>
                        </li>
                        <li className={`${styles.breadcrumb_item} ${styles.breadcrumb_item_active} me-2 d-flex text-capitalize`}>
                            <Link to={`/${dashboardItemB}`} className="text-decoration-none">
                                <Title color="#6B7280">{item.first}</Title>
                            </Link>
                        </li>
                        <li className={`${styles.breadcrumb_item} d-flex text-capitalize`}>
                            <Title color="#6B7280">{item.second}</Title>
                        </li>
                    </>
                )}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
