import { api } from '@/Api/index'
import notification from '@/ApiConstance/toast'

export default {
  async index(name) {
    return await api.get(`getbookings?filter[full_name]=${name}`)
  },

  async store(payload) {
    return await api.post('/addbooking', payload).then((res) => {
      notification.toast('Successfully Added ', 'success')
    })
  },

  async update(payload, id) {
    return await api.put(`/updatebooking/${id}`, payload).then((res) => {
      notification.toast('Successfully Updated', 'success')
      window.location.href = '/mybooking'
    })
  },

  async delete(id) {
    return await api.delete(`/deletebooking/${id}`).then((res) => {
      notification.toast('Successfully Deleted ', 'success')
      window.location.href = '/mybooking'
    })
  },
}
