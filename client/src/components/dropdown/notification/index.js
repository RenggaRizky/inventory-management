import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import "moment/locale/id";

import { RiNotification2Line } from "react-icons/ri";
import { AiOutlineWarning } from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi";
import { url } from "../../../api";
import { useLocation } from "react-router-dom";
import Subtitle from "../../typography/subtitle";
import { H6 } from "../../typography/heading";
import moment from "moment";

const Notification = ({ shownotification, setshownotification }) => {
    const location = useLocation();
    const [notifikasi, setNotifikasi] = useState(null);
    const [klikNotifikasi, setKlikNotifikasi] = useState(false);

    const widthNotifikasi = klikNotifikasi ? "400px" : "0px";

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
        <div className={`${styles.notification_wrapper} dropdown`} style={{ width: widthNotifikasi }} onClick={() => setKlikNotifikasi(!klikNotifikasi)}>
            <button type='button' className={`${styles.dropdown} btn btn-secondary dropdown-toggle`} data-bs-toggle='dropdown' data-bs-display='static' aria-expanded='false'>
                <RiNotification2Line className={styles.notification_icon}></RiNotification2Line>
            </button>

            <ul className={`${styles.dropdown_menu} dropdown-menu dropdown-menu-lg-end`} aria-labelledby='dropdownMenuLink'>
                {notifikasi === null || notifikasi.length === 0 ? (
                    <li>
                        <a className={`${styles.dropdown_item} dropdown-item`} href='#'>
                            Tidak Ada Notifikasi
                        </a>
                    </li>
                ) : (
                    <>
                        {notifikasi.map((x) => {
                            return (
                                <li className={`${styles.dropdown_item} dropdown-item p-1`}>
                                    <div className='row'>
                                        <div className='col d-flex justify-content-center align-items-center'>
                                            {(x.status === "Habis" || x.status === "Penuh") && <AiOutlineWarning className={styles.icon_dropdown_item_error} />}
                                            {x.status === "Hampir Habis" && <AiOutlineWarning className={styles.icon_dropdown_item_warning} />}
                                        </div>
                                        <div className='col-8'>
                                            <H6>{x.pesan}</H6>
                                            <Subtitle fontsize='0.75rem'>{moment(x.tanggalPemberitahuan).format("LLLL")}</Subtitle>
                                        </div>
                                        <div className='col d-flex justify-content-start align-items-center'>
                                            <HiOutlineTrash className='' onClick={() => deleteNotification(x._id)} />
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
