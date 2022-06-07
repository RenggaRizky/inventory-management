import React from "react";

const Title = ({ color = "#111928", fontsize = "1rem", fontweight = "400", lineheight = "25px", margin = 0, padding = 0, texttransform = "none", textalign, ...props }) => {
    const title = {
        color: color,
        fontFamily: '"Poppins", sans-serif',
        fontSize: fontsize,
        fontWeight: fontweight,
        lineHeight: lineheight,
        letterSpacing: "0em",
        margin: margin,
        padding: padding,
        textTransform: texttransform,
        textAlign: textalign,
    };

    return <p style={title}>{props.children}</p>;
};

export default Title;
