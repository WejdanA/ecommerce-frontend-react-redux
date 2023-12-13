import axios from 'axios'

const isDevelopment = import.meta.env.MODE === 'development'
let baseURL = 'http://localhost:5050/'

if (!isDevelopment) {
  baseURL = 'http://localhost:5050/'
}

axios.defaults.withCredentials = true
const api = axios.create({
  baseURL
})

export default api
