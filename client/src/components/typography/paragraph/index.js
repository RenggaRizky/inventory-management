import React from "react";
import { colors } from "../../../colors";

const P = ({ color = colors.gray_900, fontsize = "1rem", fontweight = "400", margin = "0", padding = "0", ...props }) => {
    const paragraph = {
        color: color,
        fontFamily: '"Poppins", sans-serif',
        fontSize: fontsize,
        fontWeight: fontweight,
        lineHeight: "19px",
        letterSpacing: "0em",
        margin: margin,
        padding: padding,
    };

    return (
        <p style={paragraph} {...props}>
            {props.children}
        </p>
    );
};

export default P;
