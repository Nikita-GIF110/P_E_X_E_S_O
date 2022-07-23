import instance from '../axiosInstance'

const URI = 'character'

export const characters = {
  async index() {
    return instance().get(URI)
  },
}
