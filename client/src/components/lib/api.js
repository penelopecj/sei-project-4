import axios from 'axios'
const baseUrl = '/api'

export function getAllPies() {
  return axios.get(`${baseUrl}/pies`)
}

export function getAllUsers() {
  return axios.get(`${baseUrl}/auth/users`)
}

export function getSingleUser() {
  return axios.get(`${baseUrl}/auth/users`)
}

export function getBasket() {
  return axios.get(`${baseUrl}/basket`)
}