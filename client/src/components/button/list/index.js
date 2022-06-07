import React from "react";
import styles from "./style.module.css";
import { Link, NavLink } from "react-router-dom";

import { BsHddRack } from "react-icons/bs";
import { RiHome6Line } from "react-icons/ri";

import Subtitle from "../../typography/subtitle";
import Title from "../../typography/title";

const BtnList = ({ data, props }) => {
    return (
        <ul className={`${styles.list_btn_wrapper} w-100 list-unstyled overflow-auto`}>
            {data.map((x) => {
                return (
                    <NavLink to="/tempat-penyimpanan" className="text-decoration-none">
                        <li className={`${styles.list_btn} mb-2`}>
                            <button className="btn d-flex align-items-center w-100">
                                <div className={`${styles.wrapper_icon_storage} d-flex rounded-circle`}>
                                    {x.jenis.toLowerCase() === "rak" ? <BsHddRack className={styles.icon_storage} /> : <RiHome6Line className={styles.icon_storage} />}
                                </div>
                                <div className="d-flex flex-column text-left ps-4">
                                    <Title texttransform="uppercase" color="#111928" lineheight="20px" textalign="left">
                                        {x.nama}
                                    </Title>
                                    <Subtitle lineheight="15px" texttransform="capitalize">
                                        {x.lokasi}
                                    </Subtitle>
                                </div>
                            </button>
                        </li>
                    </NavLink>
                );
            })}
        </ul>
    );
};

export default BtnList;
