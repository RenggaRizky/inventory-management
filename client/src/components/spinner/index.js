import React from "react";
import { colors } from "../../colors";

const Spinner = () => {
    return (
        <div className="d-flex justify-content-center">
            <div
                className="spinner-border"
                role="status"
                style={{
                    color: colors.gray_800,
                }}
            >
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default Spinner;
