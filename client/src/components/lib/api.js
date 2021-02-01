import axios from 'axios'
import { getToken } from './auth'

function headers() {
  return {
    headers: { Authorization: `Bearer ${getToken()}` }
  }
}
const baseUrl = '/api'


// * Pie functions

export function getAllPies() {
  return axios.get(`${baseUrl}/pies/`)
}

export function createPie() {
  return axios.post(`${baseUrl}/pies/`)
}

export function getSinglePie(id) {
  return axios.get(`${baseUrl}/pies/${id}/`)
}

// * User functions

export function getAllUsers() {
  return axios.get(`${baseUrl}/auth/users/`, headers())
}

export function getSingleUser() {
  return axios.get(`${baseUrl}/auth/profile/`, headers())
}

export function editUser(id, formdata) {
  return axios.put(`${baseUrl}/auth/users/${id}/`, formdata, headers())
}

export function registerUser(formdata) {
  return axios.post(`${baseUrl}/auth/register/`, formdata)
}

export function loginUser(formdata) {
  return axios.post(`${baseUrl}/auth/login/`, formdata)
}

// * Basket functions

export function getAllBasketItems() {
  return axios.get(`${baseUrl}/basket/`, headers())
}

export function createBasketItem(pie) {
  return axios.post(`${baseUrl}/basket/`, pie, headers())
}

export function deleteBasketItem(id) {
  return axios.delete(`${baseUrl}/basket/${id}`, headers())
}

export function updateBasketItem(id, formdata) {
  return axios.put(`${baseUrl}/basket/${id}`, formdata, headers())
}

// * Review functions

export function addReview(formdata) {
  return axios.post(`${baseUrl}/reviews/`, formdata, headers())
}

export function deleteReview(reviewId) {
  return axios.delete(`${baseUrl}/reviews/${reviewId}`, headers())
}

// * Category functions

export function getAllCategories() {
  return axios.get(`${baseUrl}/categories/`)
}
