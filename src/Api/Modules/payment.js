import { api } from '@/Api/index'
import notification from '@/ApiConstance/toast'

export default {
  async index() {
    return await api.get('/getpayments')
  },

  async store(payload) {
    return await api.post('/addpayment', payload).then((res) => {
      notification.toast('Successfully Added ', 'success')
    })
  },

  async update(payload, id) {
    return await api.put(`/updatepayment/${id}`, payload).then((res) => {
      notification.toast('Successfully Updated', 'success')
    })
  },

  async delete(id) {
    return await api.delete(`/deletepayent/${id}`).then((res) => {
      notification.toast('Successfully Deleted ', 'success')
    })
  },
}
