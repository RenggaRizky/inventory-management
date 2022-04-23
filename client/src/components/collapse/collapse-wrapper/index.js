import React from "react";

const CollapseWrapper = (props) => {
    const styles = {
        marginBottom: "5px",
    };

    return <div style={styles}>{props.children}</div>;
};

export default CollapseWrapper;
