import React from "react";
import Navbar from "../navbar";

const Wrapper = ({ user, setuser, children, ...props }) => {
    return (
        <>
            <Navbar user={user} setuser={setuser} onclick={props.onclick} />
            {children}
        </>
    );
};

export default Wrapper;
