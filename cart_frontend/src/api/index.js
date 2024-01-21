import axiosInstance from "axios";

const url = process.env.REACT_APP_ENV === 'dev'? "http://localhost:5000" :"https://cart-backend.vercel.app" ;

const axios = axiosInstance.create({
    baseURL: url,
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token") || "",
    },
});

export default axios;