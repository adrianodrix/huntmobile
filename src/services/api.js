import axios from 'axios'

const api = axios.create({
  baseURL: 'https://huntproducts-nodeapi.herokuapp.com/api'
})

export default api
