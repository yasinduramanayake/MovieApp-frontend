import { api } from '@/Api/index'
import notification from '@/ApiConstance/toast'

export default {
  async index(email) {
    return await api.get(`/getpayments?filter[email]=${email}`)
  },

  async store(payload) {
    return await api.post('/addpayment', payload).then((res) => {
      notification.toast('Payment Successfull! ', 'success')
    })
  },

  async update(payload, id) {
    return await api.put(`/updatepayment/${id}`, payload).then((res) => {
      notification.toast('Successfully Updated', 'success')
      window.location.href = '/mypaydetails'
    })
  },

  async delete(id) {
    return await api.delete(`/deletepayment/${id}`).then((res) => {
      notification.toast('Successfully Deleted ', 'success')
      window.location.href = '/mypaydetails'
    })
  },
}
