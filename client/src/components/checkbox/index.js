import React from "react";
import Subtitle from "../typography/subtitle";
import styles from "./style.module.css";

const Checkbox = ({ ...props }) => {
    return (
        <div className={`${styles.check_wrapper} form-check`}>
            <input className="form-check-input" type="checkbox" value={props.value} id={props.id} {...props} />
            <label className="form-check-label" htmlFor={props.id}>
                <Subtitle fontsize="0.75rem" margin="0 0 0 0.25rem">
                    {props.label}
                </Subtitle>
            </label>
        </div>
    );
};

export default Checkbox;
