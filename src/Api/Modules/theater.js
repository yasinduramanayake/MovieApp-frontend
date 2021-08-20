import { api } from '@/Api/index'
import notification from '@/ApiConstance/toast'

export default {
  async index(name) {
    return await api.get(`/gettheaters?filter[name]=${name}`)
  },

  async store(payload) {
    return await api.post('/addtheater', payload).then((res) => {
      notification.toast('Successfully Added ', 'success')
      window.location.href = '/theaters'
    })
  },

  async update(payload, id) {
    return await api.put(`/updatetheater/${id}`, payload).then((res) => {
      notification.toast('Successfully Updated', 'success')
      window.location.href = '/theaters'
    })
  },

  async delete(id) {
    return await api.delete(`/deletetheater/${id}`).then((res) => {
      notification.toast('Successfully Deleted ', 'success')
      window.location.href = '/theaters'
    })
  },
}
