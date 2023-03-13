import { url } from "../api";

export const login = (formLogin, navigate) => async (dispatch) => {
    try {
        const { data } = await url.post("/user/login", formLogin);

        dispatch({ type: "AUTH", data });
        navigate("/");
    } catch (error) {
        console.log(error);
    }
};

export const register = (formRegister, navigate) => async (dispatch) => {
    try {
        const { data } = await url.post("/user/register", formRegister);
        console.log(data.message);
        navigate("/login");
    } catch (error) {
        console.log(error);
    }
};
