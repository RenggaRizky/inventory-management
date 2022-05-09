import * as api from "../api";

export const getProduk = () => async (dispatch) => {
    try {
        const { data } = await api.fetchDataProduk();
        dispatch({
            type: "FETCH_DATA",
            payload: data,
        });
    } catch (error) {
        console.log(error.message);
    }
};

export const postProduk = (produk) => async (dispatch) => {
    try {
        const { data } = await api.createDataProduk(produk);
        dispatch({
            type: "CREATE_DATA",
            payload: data,
        });
    } catch (error) {
        console.log(error.message);
    }
};
