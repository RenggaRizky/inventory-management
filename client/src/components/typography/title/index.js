import React from "react";

const Title = ({ color = "#111928", fontsize = "1rem", fontweight = "400", margin = 0, padding = 0, ...props }) => {
    const title = {
        color: color,
        fontFamily: '"Poppins", sans-serif',
        fontSize: fontsize,
        fontWeight: fontweight,
        lineHeight: "25px",
        letterSpacing: "0em",
        margin: margin,
        padding: padding,
    };

    return <p style={title}>{props.children}</p>;
};

export default Title;
