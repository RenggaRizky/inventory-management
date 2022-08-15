import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { url } from "../../api";
import { useDispatch } from "react-redux";

import BtnPrimary from "../../components/button/primary";
import Divider from "../../components/divider";
import InputPassword from "../../components/form/password";
import InputText from "../../components/form/text";
import { H1 } from "../../components/typography/heading";
import Subtitle from "../../components/typography/subtitle";
import { Title } from "../../components/typography/title";
import styles from "./style.module.css";
import { login } from "../../actions/auth";
import { url } from "../../api";
import { ErrorAlert } from "../../components/alert";
import P from "../../components/typography/paragraph";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formLogin, setFormLogin] = useState({
        username: "",
        password: "",
    });

    const [responseErrorMessage, setErrorResponseMessage] = useState("");

    const login = () => {
        url.post("/user/login", formLogin)
            .then((response) => {
                localStorage.setItem("profile", JSON.stringify(response.data));

                navigate("/");
            })
            .catch((error) => {
                setErrorResponseMessage(error.response.data);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login();
        // dispatch(login(formLogin, navigate));
    };

    return (
        <div className={`${styles.wrapper} d-flex justify-content-center align-items-center flex-column`}>
            <div className="card w-50 text-center px-4 py-5 align-self-center">
                {/* <p className={`${styles.brand} mb-5`}>
                    Aly Jaya<span>.</span>
                </p> */}

                <H1 bs="my-5">LOGIN</H1>
                {responseErrorMessage && (
                    <ErrorAlert>
                        <P fontsize="1rem">{responseErrorMessage.message}</P>
                    </ErrorAlert>
                )}

                <form className="text-start mb-5 mt-3" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="inputUsername" className="ms-1 mb-2">
                            <Title color="#111928" fontweight="500">
                                Username
                            </Title>
                        </label>
                        <InputText defaultValue={formLogin.username} onChange={(e) => setFormLogin({ ...formLogin, username: e.target.value })} placeholder="Masukan Username" id="inputUsername" required />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="inputPassword" className="ms-1 mb-2">
                            <Title color="#111928" fontweight="500">
                                Password
                            </Title>
                        </label>
                        <InputPassword defaultValue={formLogin.password} onChange={(e) => setFormLogin({ ...formLogin, password: e.target.value })} placeholder="Masukan Password" id="inputPassword" required />
                    </div>

                    <BtnPrimary type="submit" value="Login" bs="w-100 text-uppercase mb-5 py-2" />
                </form>
                <Divider />
                <div className="mt-4">
                    <Subtitle>
                        Belum punya akun?{" "}
                        <Link to="/register" className={styles.register_link}>
                            Register
                        </Link>
                    </Subtitle>
                </div>
            </div>
        </div>
    );
};

export default Login;
