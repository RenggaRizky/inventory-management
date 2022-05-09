import React from "react";
const Spinner = () => {
    return (
        <div class="d-flex justify-content-center">
            <div
                class="spinner-border"
                role="status"
                style={{
                    color: "#5E35B1",
                }}
            >
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default Spinner;
