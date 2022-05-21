import React from "react";
import styles from "./style.module.css";

import { RiNotification2Line } from "react-icons/ri";

const Notification = () => {
    return (
        <div className={`${styles.notification_wrapper} dropdown`}>
            {/* <a className={`${styles.dropdown} btn `} href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false"></a> */}
            <button type="button" className={`${styles.dropdown} btn btn-secondary dropdown-toggle`} data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                <RiNotification2Line className={styles.notification_icon} />
            </button>

            <ul className="dropdown-menu dropdown-menu-lg-end" aria-labelledby="dropdownMenuLink">
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

export default Notification;
