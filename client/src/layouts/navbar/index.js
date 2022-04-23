import React from "react";
import styles from "./style.module.css";

import { HiMenu } from "react-icons/hi";
import { RiNotification2Line } from "react-icons/ri";

import AccountSetting from "../../components/dropdown/account-setting";

const Navbar = () => {
    // prettier-ignore
    const {
        hamburger_menu,
        hamburger_icon,
        header,
        header_brand,
        header_brand_wrapper,
        info_wrapper,
        notification_btn,
        notification_icon,
        setting_btn,
        setting_icon
    } = styles

    return (
        <header className={`${header} navbar navbar-light fixed-top`}>
            <div className={`${header_brand_wrapper} d-flex justify-content-between align-items-center`}>
                <a className={header_brand} href="#">
                    Aly
                    <span style={{ color: "#673AB7" }}> Jaya</span>
                </a>
                <button className={`${hamburger_menu} navbar-toggler`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <HiMenu className={hamburger_icon} />
                </button>
            </div>

            <div className={`${info_wrapper} d-flex justify-content-between align-items-center`}>
                <button type="button" className={`${notification_btn} navbar-toggler`}>
                    <RiNotification2Line className={notification_icon} />
                </button>
                <AccountSetting />
            </div>
        </header>
    );
};

export default Navbar;
