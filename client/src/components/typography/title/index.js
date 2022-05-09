import React from "react";

const Title = (props) => {
    const title = {
        color: "#212121",
        fontFamily: '"Poppins", sans-serif',
        fontSize: "1rem",
        fontWeight: "400",
        lineHeight: "25px",
        letterSpacing: "0em",
        margin: "0",
    };

    return <p style={title}>{props.children}</p>;
};

export default Title;
