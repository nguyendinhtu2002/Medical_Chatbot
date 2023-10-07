import axios from 'axios'
import {API} from '../utils/apiURL'

export const loginUser = async (data) => {
    const res = await axios.post(`${API}/api/v1/user/login`, data)
    return res.data
}

export const registerUser = async (data) => {
    const res = await axios.post(`${API}/api/v1/user/register`, data)
    return res.data
}

export const getDetailUser = async (id, access_token) => {
    const res = await axios.get(`${API}/api/v1/user/${id}`, {
        headers: {
            Authorization:`Bearer ${access_token}`,
        }
    })
    return res.data
}

