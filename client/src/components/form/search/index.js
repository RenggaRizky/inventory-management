import React from "react";
import styles from "./style.module.css";

const Search = (props) => {
    return (
        <form className="w-100">
            <input className={`${styles.search} form-control `} type="text" placeholder={props.placeholder} aria-label="default input example" />
        </form>
    );
};

export default Search;
