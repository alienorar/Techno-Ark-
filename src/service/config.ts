import axios from "axios";

const https = axios.create({
    baseURL:"https://texnoark.ilyosbekdev.uz"
})

https.interceptors.request.use((config) => {
    const acces_token = localStorage.getItem("access_token")
    if (acces_token) {
        config.headers['Authorization'] = `Bearer ${acces_token}`
    }
    return config
})

export default https