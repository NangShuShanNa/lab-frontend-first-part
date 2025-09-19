import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getAuctions(perPage: Number, page: Number) {
    return apiClient.get('/auctionitems?_limit=' + perPage + '&_page=' + page)
  },
  getAuction(id: number) {
    return apiClient.get('/auctionitems/' + id)
  }
}
