import axios from "axios";

// const url = (page) => {
//     return `http://localhost:5000/${page}`;
// };

export const url = axios.create({
    baseUrl: "http://localhost:5000/",
});

export const fetchDataMerek = () => axios.get(url("merek"));
export const fetchDataJenisBarang = () => axios.get(url("jenis-barang"));
export const fetchDataProduk = () => axios.get(url("produk"));
export const fetchDataSupplier = () => axios.get(url("supplier"));

export const createDataMerek = (dataMerek) => axios.post(url("merek"), dataMerek);
export const createDataJenisBarang = (dataJenisBarang) => axios.post(url("jenis-barang"), dataJenisBarang);
export const createDataProduk = (dataProduk) => axios.post(url("produk"), dataProduk);
export const createDataSupplier = (dataSupplier) => axios.post(url("supplier"), dataSupplier);
