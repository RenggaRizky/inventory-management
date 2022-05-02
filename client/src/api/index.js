import axios from "axios";

const url = (page) => {
    return `http://localhost:5000/${page}`;
};

export const fetchDataMerek = () => axios.get(url("merek"));
export const createDataMerek = (dataMerek) => axios.post(url("merek"), dataMerek);
