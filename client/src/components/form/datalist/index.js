import React from "react";
import styles from "./style.module.css";

const InputDataList = (props) => {
    return (
        <>
            <input className={`${styles.input_datalist} form-control`} list={props.iddatalist} id={props.idinput} placeholder={props.placeholder} {...props} />
            <datalist id={props.iddatalist}>
                {props.data.map((x) => {
                    return <option value={x.value} key={x._id} />;
                })}
            </datalist>
        </>
    );
};

export default InputDataList;
