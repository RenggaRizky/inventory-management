import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import "moment/locale/id";

import { RiNotification2Line } from "react-icons/ri";
import { AiOutlineWarning } from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi";
import { url } from "../../../api";
import { useLocation } from "react-router-dom";
import Subtitle from "../../typography/subtitle";
import { colors } from "../../../colors";
import Spinner from "../../spinner";
import P from "../../typography/paragraph";
import { H6 } from "../../typography/heading";
import moment from "moment";

const Notification = ({ shownotification, setshownotification }) => {
    const location = useLocation();
    const [notifikasi, setNotifikasi] = useState(null);

    const getNotification = () => {
        url.get("/notifikasi")
            .then((response) => {
                setNotifikasi(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const deleteNotification = (id) => {
        url.delete(`/notifikasi/${id}`)
            .then((response) => {})
            .catch((error) => {
                console.log(error.message);
            });
    };

    useEffect(() => {
        getNotification();
        setshownotification(true);
    }, [location]);
    return (
        <div className={`${styles.notification_wrapper} dropdown`}>
            {/* <a className={`${styles.dropdown} btn `} href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false"></a> */}
            <button type="button" className={`${styles.dropdown} btn btn-secondary dropdown-toggle`} data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                <RiNotification2Line className={styles.notification_icon}></RiNotification2Line>
                {/* {shownotification === true && (
                    <span class="position-absolute top-30 start-50 bottom-50 translate-middle p-1 bg-danger border border-light rounded-circle">
                        <span class="visually-hidden">New alerts</span>
                    </span>
                )} */}
            </button>

            <ul className={`${styles.dropdown_menu} dropdown-menu dropdown-menu-lg-end`} aria-labelledby="dropdownMenuLink">
                {notifikasi === null || notifikasi.length === 0 ? (
                    <li>
                        <a className={`${styles.dropdown_item} dropdown-item`} href="#">
                            Tidak Ada Notifikasi
                        </a>
                    </li>
                ) : (
                    <>
                        {notifikasi.map((x) => {
                            return (
                                <li className={`${styles.dropdown_item} dropdown-item p-1`}>
                                    <div className="row">
                                        <div className="col d-flex justify-content-center align-items-center">
                                            {/* <AiOutlineWarning className={ x.status === "" } /> */}
                                            {(x.status === "Habis" || x.status === "Penuh") && <AiOutlineWarning className={styles.icon_dropdown_item_error} />}
                                            {x.status === "Hampir Habis" && <AiOutlineWarning className={styles.icon_dropdown_item_warning} />}
                                        </div>
                                        <div className="col-8">
                                            <H6>{x.pesan}</H6>
                                            <Subtitle fontsize="0.75rem">{moment(x.tanggalPemberitahuan).format("LLLL")}</Subtitle>
                                        </div>
                                        <div className="col d-flex justify-content-start align-items-center">
                                            <HiOutlineTrash className="" onClick={() => deleteNotification(x._id)} />
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </>
                )}
            </ul>
        </div>
    );
};

export default Notification;
