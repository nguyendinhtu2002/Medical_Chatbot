import axios from 'axios'
import {API} from '../utils/apiURL'

export const createMessage = async (data) => {
    const res = await axios.post(`${API}/api/v1/message`, data)
    return res.data
}

// export const getThread = async (id) => {
//     const res = await axios.get(`${API}/api/v1/group/${id}`)
//     return res.data
// }

//