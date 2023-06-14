import axios from 'axios'

export const api = axios.create({
  baseURL: window.location.origin,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
})
