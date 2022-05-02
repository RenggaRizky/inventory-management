import * as api from "../api";

export const getMerek = () => async (dispatch) => {
    try {
        const { data } = await api.fetchDataMerek();
        dispatch({
            type: "FETCH_DATA",
            payload: data,
        });
    } catch (error) {
        console.log(error.message);
    }
};

export const postMerek = (merek) => async (dispatch) => {
    try {
        const { data } = await api.createDataMerek(merek);
        dispatch({
            type: "CREATE_DATA",
            payload: data,
        });
    } catch (error) {
        console.log(error.message);
    }
};
