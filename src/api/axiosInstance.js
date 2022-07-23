import axios from 'axios'

export default () => {
  const baseURL = 'https://rickandmortyapi.com/api/'
  const axiosInstance = axios.create({ baseURL })

  axiosInstance.interceptors.response.use(
    ({ data }) => new Promise((resolve) => {
      resolve(data)
    }),
  )
  return axiosInstance
}
