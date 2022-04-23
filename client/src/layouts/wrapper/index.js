import React from "react";
import Navbar from "../navbar";

const Wrapper = (props) => {
    return (
        <>
            <Navbar />
            {props.children}
        </>
    );
};

export default Wrapper;
