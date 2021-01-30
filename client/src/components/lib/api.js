import axios from 'axios'
import { getToken } from './auth'

function headers() {
  return {
    headers: { Authorization: `Bearer ${getToken()}` }
  }
}
const baseUrl = '/api'


export function getAllPies() {
  return axios.get(`${baseUrl}/pies/`)
}

export function getSinglePie(id) {
  return axios.get(`${baseUrl}/pies/${id}/`)
}

export function getAllUsers() {
  return axios.get(`${baseUrl}/auth/users/`, headers())
}

export function getSingleUser() {
  return axios.get(`${baseUrl}/auth/profile/`, headers())
}

export function getAllBasketItems() {
  return axios.get(`${baseUrl}/basket/`, headers())
}

export function createBasketItem(pie) {
  return axios.post(`${baseUrl}/basket/`, pie, headers())
}

export function deleteBasketItem(id) {
  return axios.delete(`${baseUrl}/basket/${id}`, headers())
}

export function registerUser(formdata) {
  return axios.post(`${baseUrl}/auth/register/`, formdata)
}

export function loginUser(formdata) {
  return axios.post(`${baseUrl}/auth/login/`, formdata)
}