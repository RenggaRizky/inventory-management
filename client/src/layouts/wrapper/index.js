import React from "react";
import Navbar from "../navbar";

const Wrapper = (props) => {
    return (
        <>
            <Navbar onclick={props.onclick} />
            {props.children}
        </>
    );
};

export default Wrapper;
