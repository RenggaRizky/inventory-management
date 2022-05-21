import React from "react";
import DisableForm from "../disable";
import styles from "./style.module.css";

const InputGroupFront = (props) => {
    return (
        <div className="input-group">
            <span className={`${styles.input_group_wrapper} input-group-text`} id="basic-addon1">
                {props.wrap}
            </span>
            <input type={props.type} className={`${styles.input_text} form-control`} id={props.id} placeholder={props.placeholder} aria-label="Username" aria-describedby="basic-addon1" {...props} />
        </div>
    );
};

const InputGroupBack = (props) => {
    return (
        <div className="input-group">
            <input type={props.type} className={`${styles.input_text} form-control`} id={props.id} placeholder={props.placeholder} aria-label="Recipient's username" aria-describedby="basic-addon2" {...props} />
            <span className={`${styles.input_group_wrapper} input-group-text`} id="basic-addon2">
                {props.wrap}
            </span>
        </div>
    );
};

const InputGroupBackDisabled = (props) => {
    return (
        <div className="input-group">
            <DisableForm id={props.id} type={props.type} {...props} />
            <span className={`${styles.input_group_wrapper} input-group-text`} id="basic-addon2">
                {props.wrap}
            </span>
        </div>
    );
};

export { InputGroupFront, InputGroupBack, InputGroupBackDisabled };
