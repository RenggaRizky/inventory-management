import React from "react";
import Sidebar from "../sidebar";

const Container = (props) => {
    return (
        <>
            <Sidebar hamburgermenu={props.hamburgermenu} />
            {props.children}
        </>
    );
};

export default Container;
