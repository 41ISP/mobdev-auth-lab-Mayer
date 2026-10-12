import axios from "axios"
import { useUserStore } from '../store/useUserStore'

const apiInstance = axios.create({
    baseURL: "https://api.kitek-pg.ru/api/marketplace/",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
})

apiInstance.interceptors.request.use((config) => {
    const { session } = useUserStore.getState()
    if (session?.token) {
        config.headers.Authorization = `Bearer ${session.token}`
    }
    return config
})

const getItem = async () => {
    const res = await apiInstance.get('/items')
    return res
}
const sendItem = async (item) => {
    const res = await apiInstance.post('/items', item)
    return res
}


const registerUser = async (user) => {
    const res = await apiInstance.post("/auth/register", user)

    return res
}

const loginUser = async (user) => {
    const res = await apiInstance.post("/auth/login", user)

    return res
}

const reportItem = async (id) => {
    const res = await apiInstance.post(`/items/${id}/report`)
    return res  
}

const getStats = async () => {
    const res = await apiInstance.get("/stats")
    return res 
}

const getMyItem = async () => {
    const res = await apiInstance.get(`/my-items`)
    return res

}

const deleteItem = async (id) => {
    const res = await apiInstance.delete(`/items/${id}`)
    return res

}

const likeItem = async (id) => {
    const res = await apiInstance.post(`/items/${id}/like`)
    return res

}

const authMe = async () => {
    const res = await apiInstance.getUri("/auth/me")
    return res

}


export const api = {

    registerUser,
    loginUser,
    sendItem,
    getItem,
    reportItem,
    getStats,
    getMyItem,
    deleteItem,
    likeItem,
    authMe

}