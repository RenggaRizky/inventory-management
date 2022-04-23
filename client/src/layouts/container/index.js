import React from "react";
import Sidebar from "../sidebar";

const Container = (props) => {
    return (
        <>
            <Sidebar />
            {props.children}
        </>
    );
};

export default Container;
