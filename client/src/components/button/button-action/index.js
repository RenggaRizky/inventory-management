import React, { useEffect } from "react";
import styles from "./style.module.css";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Tooltip } from "bootstrap/dist/js/bootstrap.esm.min.js";

const ButtonAction = ({ ...props }) => {
    const { update_btn, delete_btn } = styles;

    useEffect(() => {
        Array.from(document.querySelectorAll('button[data-bs-toggle="tooltip"]')).forEach((tooltipNode) => new Tooltip(tooltipNode));
    });

    return (
        <>
            {props.type === "update" ? (
                <button className={`${update_btn} btn`} data-bs-toggle="tooltip" data-bs-placement="top" title={props.tooltipTitle}>
                    <HiOutlinePencilAlt />
                </button>
            ) : (
                <button className={`${delete_btn} btn`} data-bs-toggle="tooltip" data-bs-placement="top" title={props.tooltipTitle}>
                    <HiOutlineTrash />
                </button>
            )}
        </>
    );
};

export default ButtonAction;
