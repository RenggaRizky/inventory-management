import React from "react";

const P = (props) => {
    const paragraph = {
        color: "#616161",
        fontFamily: '"Poppins", sans-serif',
        fontSize: "1rem",
        fontWeight: "400",
        lineHeight: "19px",
        letterSpacing: "0em",
        margin: "0",
    };

    return <p style={paragraph}>{props.children}</p>;
};

export default P;
