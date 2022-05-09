import React from "react";

const H5 = (props) => {
    const h5 = {
        color: "#212121",
        fontFamily: '"Poppins", sans-serif',
        fontSize: "1rem",
        fontWeight: "500",
        lineHeight: "18px",
        letterSpacing: "0em",
        margin: "0",
    };

    return <h5 style={h5}>{props.children}</h5>;
};

export { H5 };
