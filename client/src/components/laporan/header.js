import React from "react";
import { colors } from "../../colors";
import Divider from "../divider";
import { H1 } from "../typography/heading";
import P from "../typography/paragraph";
import Subtitle from "../typography/subtitle";
import { Title } from "../typography/title";

const HeaderReport = ({ title, subtitle = "" }) => {
    return (
        <div>
            <div>
                <div className="d-flex justify-content-between align-items-top">
                    <div className="mt-3 mb-5">
                        <Title fontweight="600">TOKO ALY JAYA CIOMAS HARAPAN</Title>
                        <P fontsize="0.75rem" color={colors.gray_400}>
                            Jln. Ciomas Harapan RT02 / RW02 No. 40
                        </P>
                        <P fontsize="0.75rem" color={colors.gray_400}>
                            Desa Ciomas, Kec. Ciomas, Kab. Bogor
                        </P>
                    </div>
                    <div>
                        <img src="/images/logo.png" alt="Logo Toko Aly Jaya Ciomas" />
                    </div>
                </div>
                <Divider margin="0 0 3rem 0" />
            </div>
            <div className="text-center text-uppercase mb-5">
                <H1>{title}</H1>
                <Subtitle>{subtitle}</Subtitle>
            </div>
        </div>
    );
};

export default HeaderReport;
