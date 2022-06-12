import React from "react";
import { colors } from "../../../colors";

const Overline = ({ color = colors.gray_400, fontsize = "0.75rem", fontweight = "400", lineheight = "32px", margin = "0", padding = "0", texttransform = "uppercase", textalign, ...props }) => {
    const overline = {
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
    return (
        <p style={overline} {...props}>
            {props.children}
        </p>
    );
};

export default Overline;
