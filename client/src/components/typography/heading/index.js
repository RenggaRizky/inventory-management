import React from "react";
import { colors } from "../../../colors";

const H1 = ({ color = colors.gray_900, fontweight = "700", margin = "0", padding = "0", ...props }) => {
    const h1 = {
        color: color,
        fontFamily: '"Poppins", sans-serif',
        fontWeight: fontweight,
        fontSize: "2.125rem",
        lineHeight: "40px",
        margin: margin,
        padding: padding,
    };

    return <h1 style={h1}>{props.children}</h1>;
};

const H2 = ({ color = colors.gray_900, fontweight = "700", margin = "0", padding = "0", ...props }) => {
    const h2 = {
        color: color,
        fontFamily: '"Poppins", sans-serif',
        fontWeight: fontweight,
        fontSize: "1.5rem",
        lineHeight: "28px",
        margin: margin,
        padding: padding,
    };

    return (
        <h2 style={h2} {...props} className={props.bs}>
            {props.children}
        </h2>
    );
};

const H3 = ({ color = colors.gray_900, fontweight = "600", margin = "0", padding = "0", ...props }) => {
    const h3 = {
        color: color,
        fontFamily: '"Poppins", sans-serif',
        fontWeight: fontweight,
        fontSize: "1.25rem",
        lineHeight: "24px",
        margin: margin,
        padding: padding,
    };

    return (
        <h3 style={h3} {...props}>
            {props.children}
        </h3>
    );
};

const H4 = ({ color = colors.gray_900, fontweight = "600", margin = "0", padding = "0", ...props }) => {
    const h4 = {
        color: color,
        fontFamily: '"Poppins", sans-serif',
        fontWeight: fontweight,
        fontSize: "1rem",
        lineHeight: "20px",
        margin: margin,
        padding: padding,
    };

    return (
        <h4 style={h4} {...props}>
            {props.children}
        </h4>
    );
};

const H5 = ({ color = colors.gray_900, fontweight = "500", margin = "0", padding = "0", ...props }) => {
    const h5 = {
        color: color,
        fontFamily: '"Poppins", sans-serif',
        fontSize: "1rem",
        fontWeight: fontweight,
        lineHeight: "18px",
        letterSpacing: "0em",
        margin: margin,
        padding: padding,
    };

    return (
        <h5 style={h5} {...props}>
            {props.children}
        </h5>
    );
};

const H6 = ({ color = colors.gray_900, fontweight = "500", fontsize = "0.875rem", lineheight = "20px", margin = "0", padding = "0", ...props }) => {
    const h6 = {
        color: color,
        fontFamily: '"Poppins", sans-serif',
        fontWeight: fontweight,
        fontSize: fontsize,
        lineHeight: lineheight,
        margin: margin,
        padding: padding,
    };
    return (
        <h6 style={h6} {...props}>
            {props.children}
        </h6>
    );
};

export { H1, H2, H3, H4, H5, H6 };
