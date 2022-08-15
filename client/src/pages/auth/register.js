import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../../api";
import { useDispatch } from "react-redux";

import BtnPrimary from "../../components/button/primary";
import Divider from "../../components/divider";
import InputPassword from "../../components/form/password";
import { InputSelect } from "../../components/form/select";
import InputText from "../../components/form/text";
import { H1 } from "../../components/typography/heading";
import Subtitle from "../../components/typography/subtitle";
import { Title } from "../../components/typography/title";
import styles from "./style.module.css";
import { register } from "../../actions/auth";
import { ErrorAlert } from "../../components/alert";
import P from "../../components/typography/paragraph";

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const role = [
        { _id: "Pemilik Toko", nama: "Pemilik Toko" },
        { _id: "Admin", nama: "Admin" },
    ];

    const [formRegister, setFormRegister] = useState({
        nama: "",
        username: "",
        password: "",
        retypePassword: "",
        peran: "",
    });

    const [responseErrorMessage, setErrorResponseMessage] = useState("");

    const register = () => {
        url.post("/user/register", formRegister)
            .then((response) => {
                console.log(response.data);
                navigate("/login");
            })
            .catch((error) => {
                setErrorResponseMessage(error.response.data);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        register();
        // dispatch(register(formRegister, navigate));
    };

    return (
        <div className={`${styles.wrapper} d-flex justify-content-center align-items-center flex-column`}>
            <div className="card w-50 text-center px-4 py-5 align-self-center">
                {/* <p className={`${styles.brand} mb-5`}>
                    Aly Jaya<span>.</span>
                </p> */}

                <H1 bs="my-4">REGISTER</H1>

                {responseErrorMessage && (
                    <ErrorAlert>
                        <P fontsize="1rem">{responseErrorMessage.message}</P>
                    </ErrorAlert>
                )}

                <form className="text-start mb-5 mt-3" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="inputNama" className="ms-1 mb-2">
                            <Title color="#111928" fontweight="500">
                                Nama
                            </Title>
                        </label>
                        <InputText defaultValue={formRegister.nama} onChange={(e) => setFormRegister({ ...formRegister, nama: e.target.value })} placeholder="Masukan Nama" id="inputNama" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="inputUsername" className="ms-1 mb-2">
                            <Title color="#111928" fontweight="500">
                                Username
                            </Title>
                        </label>
                        <InputText defaultValue={formRegister.username} onChange={(e) => setFormRegister({ ...formRegister, username: e.target.value })} placeholder="Masukan Username" id="inputUsername" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="inputPassword" className="ms-1 mb-2">
                            <Title color="#111928" fontweight="500">
                                Password
                            </Title>
                        </label>
                        <InputPassword defaultValue={formRegister.password} onChange={(e) => setFormRegister({ ...formRegister, password: e.target.value })} placeholder="Masukan Password" id="inputPassword" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="inputRetypePassword" className="ms-1 mb-2">
                            <Title color="#111928" fontweight="500">
                                Ulangi Password
                            </Title>
                        </label>
                        <InputPassword defaultValue={formRegister.retypePassword} onChange={(e) => setFormRegister({ ...formRegister, retypePassword: e.target.value })} placeholder="Masukan Ulang Password" id="inputRetypePassword" />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="selectRole" className="ms-1 mb-2">
                            <Title color="#111928" fontweight="500">
                                Peran
                            </Title>
                        </label>
                        <InputSelect data={role} itemselected="Pilih peran" value={formRegister.peran} onChange={(e) => setFormRegister({ ...formRegister, peran: e.target.value })} required />
                    </div>

                    <BtnPrimary type="submit" value="Register" bs="w-100 text-uppercase my-1 py-2" />
                </form>
                <Divider />
                <div className="mt-4">
                    <Subtitle>
                        Sudah punya akun?{" "}
                        <Link to="/login" className={styles.register_link}>
                            Login
                        </Link>
                    </Subtitle>
                </div>
            </div>
        </div>
    );
};

export default Register;
