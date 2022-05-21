import React from "react";
import styles from "./style.module.css";

import { FiSettings } from "react-icons/fi";

const AccountSetting = () => {
    return (
        <div className="dropdown">
            <a className={`${styles.dropdown} btn `} href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="./images/avatar.png" />
                <FiSettings />
            </a>

            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink">
                <li>
                    <a className="dropdown-item" href="#">
                        Action
                    </a>
                </li>
                <li>
                    <a className="dropdown-item" href="#">
                        Another action
                    </a>
                </li>
                <li>
                    <a className="dropdown-item" href="#">
                        Something else here
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default AccountSetting;
