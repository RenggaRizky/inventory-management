import React from "react";

const Subtitle = (props) => {
    const subtitle = {
        fontFamily: '"Poppins", sans-serif',
        fontSize: "0.875rem",
        fontWeight: "400",
        lineHeight: "25px",
        letterSpacing: "0em",
        color: "#9E9E9E",
        margin: "0 0 0.375rem  0",
        padding: "0 0 0 0.375rem",
    };

    return (
        <p style={subtitle} {...props}>
            {props.children}
        </p>
    );
};

export default Subtitle;
