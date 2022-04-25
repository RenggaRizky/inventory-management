import React from "react";
import styles from "./style.module.css";

const Pagination = () => {
    const { pagination } = styles;

    return (
        <ul className={`${pagination} pagination`}>
            <li className="page-item">
                <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li className="page-item">
                <a className="page-link" href="#">
                    1
                </a>
            </li>
            <li className="page-item">
                <a className="page-link" href="#">
                    2
                </a>
            </li>
            <li className="page-item">
                <a className="page-link" href="#">
                    3
                </a>
            </li>
            <li className="page-item">
                <a className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    );
};

export default Pagination;
