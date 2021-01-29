import axios from 'axios'
import { getToken } from './auth'

function headers() {
  return {
    headers: { Authorization: `Bearer ${getToken()}` }
  }
}
const baseUrl = '/api'


export function getAllPies() {
  return axios.get(`${baseUrl}/pies`)
}

export function getAllUsers() {
  return axios.get(`${baseUrl}/auth/users`, headers())
}

export function getSingleUser() {
  return axios.get(`${baseUrl}/auth/profile`, headers())
}

export function getBasket() {
  return axios.get(`${baseUrl}/basket`, headers())
}