import axios from 'axios'
import Swal from 'sweetalert2'

const baseURL = 'http://localhost:3000/api/'
// const baseURL = 'https://live-chat-app-2022.herokuapp.com/api/'


const axiosInstance = axios.create({
  baseURL
})

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
}, error => {
  Promise.reject(error)
})

export const apiHelper = axiosInstance

export const Toast = Swal.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: false,
  timer: 3000
})