import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
});

// Flag to prevent multiple refresh token requests
let isRefreshing = false;
// Queue of callbacks to run after token refresh
let refreshQueue = [];

// Function to refresh token
const refreshToken = async () => {
    const refreshToken = localStorage.getItem('REFRESH_TOKEN');
    if (!refreshToken) return Promise.reject('No refresh token');
    
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}auth/token/refresh/`, 
            { refresh: refreshToken }
        );
        
        localStorage.setItem('ACCESS_TOKEN', response.data.access);
        localStorage.setItem('REFRESH_TOKEN', response.data.refresh);
        return response.data.access;
    } catch (error) {
        localStorage.removeItem('ACCESS_TOKEN');
        localStorage.removeItem('REFRESH_TOKEN');
        return Promise.reject(error);
    }
};

// Add token to requests
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('ACCESS_TOKEN');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Handle 401 errors and token refresh
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        // Only handle 401 errors that haven't been retried
        if (!error.response || error.response.status !== 401 || originalRequest._retry) {
            return Promise.reject(error);
        }
        
        originalRequest._retry = true;
        
        // If we're already refreshing, queue this request
        if (isRefreshing) {
            return new Promise(resolve => {
                refreshQueue.push(token => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    resolve(axiosInstance(originalRequest));
                });
            });
        }
        
        // Start refreshing process
        isRefreshing = true;
        
        try {
            const newToken = await refreshToken();
            
            // Process queue with new token
            refreshQueue.forEach(callback => callback(newToken));
            refreshQueue = [];
            
            // Retry original request
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return axiosInstance(originalRequest);
        } catch (refreshError) {
            // Notify app about auth failure
            window.dispatchEvent(new CustomEvent('auth:logout'));
            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    }
);

export default axiosInstance;