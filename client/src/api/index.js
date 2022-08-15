import axios from "axios";

export const url = axios.create({
    baseUrl: "http://localhost:5000",
});
