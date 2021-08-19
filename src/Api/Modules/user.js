import { api } from '@/Api/index'
import notification from '@/ApiConstance/toast'

export default {
  async index() {
    return await api.get('/getusers')
  },

  async store(payload) {
    return await api.post('/adduser', payload).then((res) => {
      notification.toast('Successfully Added', 'success')
      window.location.href = '/members'
    })
  },

  async update(payload, id, role) {
    return await api.put(`/updateuser/${id}`, payload).then((res) => {
      notification.toast('Successfully Updated', 'success')
      window.location.href = '/members'
    })
  },

  async delete(id) {
    return await api.delete(`/deleteuser/${id}`).then((res) => {
      notification.toast('Successfully Deleted ', 'success')
      window.location.href = '/members'
    })
  },
}
