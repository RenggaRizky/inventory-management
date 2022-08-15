import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useOutletContext } from "react-router-dom";
import { url } from "../../../api";
import { colors } from "../../../colors";
import Spinner from "../../../components/spinner";
import { H1, H2, H3, H5 } from "../../../components/typography/heading";
import Overline from "../../../components/typography/overline";
import styles from "../style.module.css";

const DetailUser = () => {
    const location = useLocation();

    const [infoUser, setInfoUser] = useState(null);
    const [user, setUser] = useOutletContext();
    const [idUser, setIdUser] = useState(location.state === null ? null : location.state.id);
    console.log(idUser);
    const getInfoUser = (id) => {
        url.get(`/user/${id}`)
            .then((response) => {
                setInfoUser(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    useEffect(() => {
        getInfoUser(idUser);
    }, []);

    if (idUser === null) {
        return <Navigate to="/" replace />;
    }

    return (
        <>
            {infoUser === null ? (
                <Spinner />
            ) : (
                <div>
                    <div className={`${styles.user_info_wrapper} d-flex align-items-center`}>
                        <div className={`${styles.user_profile_wrapper} d-flex justify-content-center align-items-center rounded-circle`}>
                            <H1 color={colors.white} texttransform="uppercase">
                                {infoUser.username.charAt(0)}
                            </H1>
                        </div>
                        <div>
                            <H2 color={colors.white} texttransform="uppercase" margin="0 0 6px 0">
                                {infoUser.username}
                            </H2>
                            <H5 color={colors.white}>{infoUser.peran}</H5>
                        </div>
                    </div>
                    <div className="row px-4 py-3">
                        <div className="col">
                            <div className="mb-3">
                                <Overline>Nama</Overline>
                                <H3 texttransform="capitalize">{infoUser.nama}</H3>
                            </div>
                            <div className="mb-3">
                                <Overline>Username</Overline>
                                <H3 texttransform="capitalize">{infoUser.username}</H3>
                            </div>
                        </div>
                        <div className="col">
                            <div className="mb-3">
                                <Overline>Peran</Overline>
                                <H3 texttransform="capitalize">{infoUser.peran}</H3>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DetailUser;
