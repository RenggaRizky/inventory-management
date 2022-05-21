import React from "react";

const Divider = ({ bordercolor = "rgb(238, 238, 238)", margin = 0, ...props }) => {
    const styles = {
        borderStyle: "solid",
        borderColor: bordercolor,
        borderWidth: "0px 0px thin",
        opacity: "1",
        margin: margin,
        // margin : "18px 0"
    };

    return <div style={styles} />;
};

export default Divider;
