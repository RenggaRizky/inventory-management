import React from "react";
import styles from "./style.module.css";

const Search = () => {
    const { search } = styles;

    return (
        <form className="w-100">
            <input className={`${search} form-control form-control-lg`} type="text" placeholder="Cari produk" aria-label="default input example" />
        </form>
    );
};

export default Search;
