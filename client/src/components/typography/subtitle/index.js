import React from "react";
import { colors } from "../../../colors";

const Subtitle = ({ color = colors.gray_400, fontsize = "0.875rem", fontweight = "400", lineheight = "25px", margin = "0", padding = "0", texttransform, ...props }) => {
    const subtitle = {
        color: color,
        fontFamily: '"Poppins", sans-serif',
        fontSize: fontsize,
        fontWeight: fontweight,
        lineHeight: lineheight,
        letterSpacing: "0em",
        margin: margin,
        padding: padding,
        textTransform: texttransform,
    };

    return <p style={subtitle}>{props.children}</p>;
};

export default Subtitle;
