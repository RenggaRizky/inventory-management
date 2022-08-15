import React from "react";
import { colors } from "../../colors";

const SpinnerWhite = (props) => {
    return (
        <div className={`${props.bs} d-flex justify-content-center`}>
            <div
                className="spinner-border"
                role="status"
                style={{
                    color: colors.white,
                }}
            >
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default SpinnerWhite;
