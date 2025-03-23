import axios from "axios";
import axiosInstance from "../axiosInstance"

export const loginUser = async (data) => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    return axios.post(`${apiBaseUrl}auth/login/`, {
        email: data.email,
        password: data.password
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};


export const logoutUser = async (navigate) => {
    try {
        const refresh = localStorage.getItem("REFRESH_TOKEN")
        await axiosInstance.options('auth/logout', refresh)
        localStorage.removeItem("ACCESS_TOKEN")
        localStorage.removeItem("REFRESH_TOKEN")
        navigate('/login')
    } catch {
        localStorage.removeItem("ACCESS_TOKEN")
        localStorage.removeItem("REFRESH_TOKEN")
    }
}