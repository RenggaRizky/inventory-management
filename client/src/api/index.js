import axios from "axios";

export const url = axios.create({
    baseUrl: "https://alyjaya-inventory.herokuapp.com",
});
