import axiosInstance from "../axiosInstance";

export const createUser = async (userData) => {
    const response = await axiosInstance.post('auth/register/', userData);
    return response;
}


export const retrieveUserList = async () => {
    const response = await axiosInstance.get('auth/users/')
    return response
}

export const updateUserStatus = async (userId, newStatus) => {
    const response = await axiosInstance.patch(`auth/users/${userId}/status/`, 
        { is_active: newStatus },)
    return response
}