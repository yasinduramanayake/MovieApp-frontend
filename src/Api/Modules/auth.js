import { api } from '@/Api/index'
import { setToken, clearToken } from '../index'
import notification from '@/ApiConstance/toast'

export default {
  async register(payload) {
    return await api.post('/register', payload)
  },
  async login(payload) {
    return await api.post('/login', payload).then((res) => {
      const token = res.data.token
      const name = res.data.data.name
      const role = res.data.data.role
      setToken(token)
      localStorage.setItem('token', token)
      localStorage.setItem('name', name)
      localStorage.setItem('role', role)
      notification.toast('Successfully logged in', 'success')
      if (localStorage.role === 'admin') {
        window.location.href = '/dashboard'
      }
    })
  },
  async profile() {
    return await api.get('/profile')
  },
  async logout() {
    clearToken()
    return await api.get('/logout')
  },
}
