import axios from 'axios'
import {API} from '../utils/apiURL'

export const createThread = async (data) => {
    const res = await axios.post(`${API}/api/v1/group`, data)
    return res.data
}

export const getThread = async (id) => {
    const res = await axios.get(`${API}/api/v1/group/${id}`)
    return res.data
}

//