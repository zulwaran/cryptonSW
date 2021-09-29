import axios from 'axios'

export const axiosDB = axios.create({
  baseURL: 'https://swapi.dev/api/'
})
