import React from "react";
import { colors } from "../../../colors";

const Subtitle = ({ color = colors.gray_400, fontsize = "0.875rem", fontweight = "400", margin = "0", padding = "0", ...props }) => {
    const subtitle = {
        color: color,
        fontFamily: '"Poppins", sans-serif',
        fontSize: fontsize,
        fontWeight: fontweight,
        lineHeight: "25px",
        letterSpacing: "0em",
        margin: margin,
        padding: padding,
        // color: "#9E9E9E",
        // margin: "0 0 0.375rem  0",
        // padding: "0 0 0 0.375rem",
    };

    return <p style={subtitle}>{props.children}</p>;
};

export default Subtitle;
