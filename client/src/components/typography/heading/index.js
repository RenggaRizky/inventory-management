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

const H6 = ({ color = colors.gray_900, fontweight = "500", margin = "0", padding = "0", ...props }) => {
    const h6 = {
        color: color,
        fontFamily: '"Poppins", sans-serif',
        fontWeight: fontweight,
        fontSize: "0.875rem",
        lineHeight: "20px",
        margin: margin,
        padding: padding,
    };
    return <h6 style={h6}>{props.children}</h6>;
};

export { H1, H3, H5, H6 };
