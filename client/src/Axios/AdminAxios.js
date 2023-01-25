

import axios from "axios";
const baseURL = "http://localhost:4000/api/";

const defaultOptions = {
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
};

// Create  user instance
let Userinstance = axios.create(defaultOptions);

// Set the AUTH token for any request
Userinstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem("adminToken");
    config.headers.accesstoken = token;
    return config;
});

export default Userinstance;