import axios from 'axios'
import notification from '@/ApiConstance/toast'

export const api = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
})

export function setToken(token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export function clearToken() {
  delete api.defaults.headers.common['Authorization']
}

api.interceptors.request.use(
  function (config) {
    if (localStorage.token) {
      config.headers.Authorization = `Bearer ${localStorage.token}`
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (typeof error.response !== 'undefined') {
      //Setup Generic Response Messages
      if (error.response.status === 401) {
        notification.toast('Unauthorized', 'warning')
      } else if (error.response.status === 404) {
        notification.toast('404 Not found', 'error')
      } else if (error.response.status === 405) {
        notification.toast('Method Not Allowed', 'warning')
      } else if (error.response.status === 422) {
        notification.toast('Given data is invalid', 'error')
      }
      if (error.response.status === 500) {
        notification.toast('Internal Server Error', 'error')
      }
    }
    return Promise.reject(error)
  },
)
