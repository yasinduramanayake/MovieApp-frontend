import { api } from '@/Api/index'
import notification from '@/ApiConstance/toast'

export default {
  async index(type) {
    return await api.get(`/getmovies?filter[type]=${type}`)
  },

  async store(payload) {
    return await api.post('/addmovie', payload).then((res) => {
      notification.toast('Successfully Added ', 'success')
      window.location.href = '/movies'
    })
  },

  async update(payload, id) {
    return await api.put(`/updatemovie/${id}`, payload).then((res) => {
      notification.toast('Successfully Updated', 'success')
      window.location.href = '/movies'
    })
  },

  async delete(id) {
    return await api.delete(`/deletemovie/${id}`).then((res) => {
      notification.toast('Successfully Deleted ', 'success')
      window.location.href = '/movies'
    })
  },

  async show(id) {
    return await api.get(`/showmovie/${id}`).then((res) => {})
  },
}
