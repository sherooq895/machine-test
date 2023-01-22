import instance from '../../Axios/AdminAxios'
import axios from 'axios'
const baseURL = "http://localhost:4000/api/";


export const AdminLogin = (data) => axios.post(`${baseURL}login`, data)
export const newForm = (data) => axios.post(`${baseURL}newForm`, data, {
    headers: {
        "accesstoken": localStorage.getItem("adminToken")
    },
})

export const AdminAuth = () => instance.get('isAdminAuth')
export const getEmployeeList = () => instance.get('getEmployeeList')

