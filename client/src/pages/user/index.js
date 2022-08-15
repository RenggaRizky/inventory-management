import React, { useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import MainCard from "../../components/card/main";
import Divider from "../../components/divider";
import HeadContent from "../../layouts/head-content";
import styles from "./style.module.css";

const User = () => {
    const [user, setUser] = useState(localStorage.getItem("profile") !== null ? JSON.parse(localStorage.getItem("profile")) : null);

    if (user === null) {
        return <Navigate to="/login" replace />;
    }
    return (
        <div className={styles.wrapper}>
            <MainCard>
                <HeadContent title="User" subtitle="Informasi detail mengenai user"></HeadContent>

                <Divider margin="0 0 24px 0" />
                <Outlet context={[user, setUser]} />
            </MainCard>
        </div>
    );
};

export default User;
