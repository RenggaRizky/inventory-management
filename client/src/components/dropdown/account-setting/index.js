import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

import { BsCaretDownFill } from "react-icons/bs";
import { colors } from "../../../colors";
import { Title } from "../../typography/title";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

const AccountSetting = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(localStorage.getItem("profile") !== null ? JSON.parse(localStorage.getItem("profile")) : null);
    const [idUser, setIdUser] = useState(null);

    const logout = () => {
        localStorage.removeItem("profile");
        setUser(null);
        navigate("/login");
    };

    useEffect(() => {
        const token = user?.token;
        const idAuthUser = user.user._id;

        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 12000 < new Date().getTime()) logout();

            setUser(localStorage.getItem("profile") !== null ? JSON.parse(localStorage.getItem("profile")) : null);
        }

        setIdUser(idAuthUser);
    }, [location]);

    if (user === null) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="dropdown">
            {user !== null && (
                <>
                    <a className={`${styles.dropdown_avatar} btn d-flex justify-content-between align-items-center`} href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                        <div className={`${styles.icon_avatar} px-3 py-2`}>
                            <Title color="#fff" texttransform="uppercase" fontsize="1rem" fontweight="500">
                                {user.user.username.charAt(0)}
                            </Title>
                        </div>

                        <span>{user.user.username}</span>
                        <BsCaretDownFill className="align-items-center" />
                    </a>

                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink">
                        <li>
                            {/* <a className="dropdown-item" href="#">
                                Profil
                            </a> */}
                            <Link className="dropdown-item" to="user" state={{ id: idUser }}>
                                Profil
                            </Link>
                        </li>
                        <li>
                            <p className="dropdown-item m-0" href="#" style={{ color: colors.error }} onClick={logout}>
                                Keluar
                            </p>
                        </li>
                    </ul>
                </>
            )}
        </div>
    );
};

export default AccountSetting;
