import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'https://noteapp-nine.vercel.app/'
})
