import axios from 'axios'
import apiconfig from '../config/api.config.json'

const API = {
    login: async (username, password) => {

        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.LOGIN,
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            data: {
                username: username,
                password: password
            }
        }

        try {
            let result = await axios(option)

            return result.data
        } catch (error){
            return error
        }
    }
    
    // company: async(code, name, created_date, created_by) => {

    // }
}

export default API