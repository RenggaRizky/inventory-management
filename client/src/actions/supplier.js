import * as api from "../api";

export const getSupplier = () => async (dispacth) => {
    try {
        const { data } = await api.fetchDataSupplier();
        dispacth({
            type: "FETCH_DATA",
            payload: data,
        });
    } catch (error) {
        console.log(error.message);
    }
};

export const postSupplier = (supplier) => async (dispacth) => {
    try {
        const { data } = await api.createDataSupplier(supplier);
        dispacth({
            type: "CREATE_DATA",
            payload: data,
        });
    } catch (error) {
        console.log(error.message);
    }
};
