import React from "react";
import Breadcrumb from "../../components/breadcrumb";
import { H1 } from "../../components/typography/heading";
import Subtitle from "../../components/typography/subtitle";

const HeadContent = (props) => {
    return (
        <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
                <H1>{props.title}</H1>
                <Subtitle>{props.subtitle}</Subtitle>
            </div>
            <Breadcrumb />
        </div>
    );
};

export default HeadContent;
