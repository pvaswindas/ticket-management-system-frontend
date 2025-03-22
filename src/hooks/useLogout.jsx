import axiosInstance from "../services/axiosInstance"

export const useLogout = () => {
    const refresh_token = localStorage.getItem("REFRESH_TOKEN")

    const logout = async () => {
        try {
            if (!refresh_token) {
                throw new Error("Refresh token is missing")
            }
            await axiosInstance.post('accounts/logout/', { refresh_token })
            localStorage.removeItem("ACCESS_TOKEN")
            localStorage.removeItem("REFRESH_TOKEN")
            return { success: true }
        } catch {
            localStorage.removeItem("ACCESS_TOKEN")
            localStorage.removeItem("REFRESH_TOKEN")
            return { success: true }
        }
    }

    return logout
}

