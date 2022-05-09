import * as api from "../api";

export const getJenisBarang = () => async (dispatch) => {
    try {
        const { data } = await api.fetchDataJenisBarang();
        dispatch({
            type: "FETCH_DATA",
            payload: data,
        });
    } catch (error) {
        console.log(error.message);
    }
};

export const postJenisBarang = (jenisBarang) => async (dispatch) => {
    try {
        const { data } = await api.createDataJenisBarang(jenisBarang);
        dispatch({
            type: "CREATE_DATA",
            payload: data,
        });
    } catch (error) {
        console.log(error.message);
    }
};
