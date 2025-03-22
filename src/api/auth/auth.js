import axios from "axios";

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
