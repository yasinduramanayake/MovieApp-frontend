import { api } from '@/Api/index'
import notification from '@/ApiConstance/toast'

export default {
  async index(type = '', name = '', page = '', per_page = '') {
    return await api.get(
      `/getmovies?filter[type]=${type}&filter[name]=${name}&page=${page}&per_page=${per_page}`,
    )
  },

  async store(payload) {
    return await api.post('/addmovie', payload).then((res) => {
      notification.toast('Successfully Added ', 'success')
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

  async genaratePdf(payload) {
    return await api.post(`/genaratereport` ,payload )
  },
}
