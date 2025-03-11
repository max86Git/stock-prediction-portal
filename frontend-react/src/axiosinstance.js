import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_BASE_API;

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json'
    }

    });

// Request interceptor
axiosInstance.interceptors.request.use(
    function(config){
        //console.log('Request without auth ==>: ', config)
        const accesToken = localStorage.getItem('accessToken')
        if(accesToken){
            config.headers.Authorization = `Bearer ${accesToken}`
            //config.headers[Authorization] = `Bearer ${accesToken}`
        }
        console.log('Request with auth ==>: ', config)
        return config;
    
    },
    function(error){
        return Promise.reject(error)
    })

// Response Interceptor
axiosInstance.interceptors.response.use(
    function(response){
        return response;
    },
    async function(error){
        const originalRequest = error.config;
        if(error.response.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refreshToken')
            try{
                const response = await axiosInstance.post('/token/refresh/', {refresh: refreshToken})
                //console.log(response.data)
                localStorage.setItem('accessToken', response.data.access)
                originalRequest.headers.Authorization = `Bearer ${response.data.access}`
                return axiosInstance(originalRequest)
            }
            catch(error){
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                return Promise.reject(error)
            }
        }
        return Promise.reject(error)
    }
)

    export default axiosInstance;