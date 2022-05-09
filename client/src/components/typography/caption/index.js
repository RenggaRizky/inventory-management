import React from "react";

const Caption = (props) => {
    const { color = "#9E9E9", fontSize = "0.875rem", margin = "0", padding = "0" } = props;

    const caption = {
        fontFamily: '"Poppins", sans-serif',
        fontSize: fontSize,
        fontWeight: "400",
        lineHeight: "21px",
        letterSpacing: "0em",
        textAlign: "justify",
        color: color,
        margin: margin,
        padding: padding,
    };

    return (
        <p style={caption} {...props}>
            {props.children}
        </p>
    );
};

export default Caption;
