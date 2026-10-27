import axios from "axios";

// Same-origin requests; next.config.ts proxies /api/* to the backend.
const api = axios.create({
    baseURL: "/api",
    headers:  {
        "Content-Type": "application/json"
    },
    withCredentials: true
})

export default api
