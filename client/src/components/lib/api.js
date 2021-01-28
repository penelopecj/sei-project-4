import axios from 'axios'
const baseUrl = '/api'

export function getAllPies() {
  return axios.get(`${baseUrl}/pies`)
}