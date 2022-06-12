import React from "react";
import { Link } from "react-router-dom";

const LinkSpan = ({ fontsize = "0.875rem", fontweight = "400", lineheight = "21px", margin = "0", padding = "0", ...props }) => {
    const link = {
        color: "#2196F3",
        fontFamily: '"Poppins", sans-serif',
        fontSize: fontsize,
        fontWeight: fontweight,
        lineHeight: lineheight,
        letterSpacing: "0em",
        margin: margin,
        padding: padding,
        textDecoration: "underline",
    };
    return (
        <Link to={props.to}>
            <span style={link}>{props.children}</span>
        </Link>
    );
};

export default LinkSpan;
