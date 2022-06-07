import React from "react";
import Spinner from "../../spinner";
import styles from "./style.module.css";

const InputSelect = ({ data, value = "", ...props }) => {
    console.log(typeof value);
    return (
        <select className={`${styles.input_select} form-select`} aria-label="Default select example" {...props} value={value}>
            <option hidden value="">
                {props.itemselected}
            </option>
            {data === null ? (
                <Spinner />
            ) : (
                data.map((x) => {
                    return (
                        <option key={x._id} value={x._id}>
                            {x.nama}
                        </option>
                    );
                })
            )}
        </select>
    );
};

export default InputSelect;
