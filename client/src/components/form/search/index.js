import React from "react";
import styles from "./style.module.css";

const Search = ({ placeholder, onchange, onsubmit, ...props }) => {
    return (
        <form className="w-100" onSubmit={onsubmit}>
            <input className={`${styles.search} form-control `} type="text" placeholder={placeholder} aria-label="default input example" onChange={onchange} {...props} />
        </form>
    );
};

export default Search;
