import axios from "axios";

export const axiosInstance = axios.create({
    baseURL : "https://zocially-mern-stack.herokuapp.com/api/"
})