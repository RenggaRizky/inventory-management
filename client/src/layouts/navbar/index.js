import React, { useEffect, useState } from "react";
import styles from "./style.module.css";

import { HiMenu } from "react-icons/hi";
import { RiNotification2Line } from "react-icons/ri";

import AccountSetting from "../../components/dropdown/account-setting";
import Notification from "../../components/dropdown/notification";
import { useLocation } from "react-router-dom";
import { url } from "../../api";

const Navbar = (props) => {
    const location = useLocation();
    const pathname = location.pathname;

    const [showNotification, setShowNotification] = useState(false);

    return (
        <>
            {pathname !== "/login" && pathname !== "/register" && (
                <header className={`${styles.header} navbar navbar-light fixed-top`}>
                    <div className={`${styles.header_brand_wrapper} d-flex justify-content-between align-items-center`}>
                        <a className={styles.header_brand} href="#">
                            Aly Jaya
                            <span>.</span>
                        </a>
                        <button
                            className={`${styles.hamburger_menu} navbar-toggler`}
                            type="button"
                            onClick={props.onclick}
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarTogglerDemo03"
                            aria-controls="navbarTogglerDemo03"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <HiMenu className={styles.hamburger_icon} />
                        </button>
                    </div>

                    <div className={`${styles.info_wrapper} d-flex justify-content-between align-items-center`}>
                        <Notification shownotification={showNotification} setshownotification={setShowNotification} onClick={() => setShowNotification(false)} />
                        <AccountSetting />
                    </div>
                </header>
            )}
        </>
    );
};

export default Navbar;
