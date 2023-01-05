import axios from "axios"

export const axiosInstance = axios.create({
    baseURL : "https://admineundang.herokuapp.com/api"
    // baseURL : "http://localhost:5000/api"
})