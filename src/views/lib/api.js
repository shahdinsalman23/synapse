import axios from 'axios'
const baseUrl = 'http://127.0.0.1:8000/' 

export function get(url, params) {
    return axios({
        method: 'GET',
        url: baseUrl+url,
        params: params
    })
}

export function byMethod(method, url, data) {
    return axios({
        method: method,
        url: baseUrl+url,
        data: data
    })
}