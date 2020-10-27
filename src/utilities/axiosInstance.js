import axios from 'axios'

const baseURL = process.env.REACT_APP_DEV_API_URL

export default axios.create({
  baseURL
})
