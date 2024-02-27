import axios from 'axios'

import { UserRecords } from './enum'

export const clearUser = () => {
    localStorage.removeItem(UserRecords.token)
}

export const http = axios.create({
    baseURL: 'https://localhost:3101',
    headers: {
        'Content-Type': 'application/json',
    },
})

http.interceptors.request.use((request) => {
    const token = localStorage.getItem(UserRecords.token)

    if (token) {
        request.headers.Authorization = token
    }

    return request
}, (error) => {
    return Promise.reject(error)
})

http.interceptors.response.use((response) => {
    const token = response.headers.authorization

    if (token) {
        localStorage.setItem(UserRecords.token, token)
    }

    return response
}, (error) => {
    return Promise.reject(error)
})
