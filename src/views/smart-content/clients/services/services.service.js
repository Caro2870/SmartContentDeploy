import { smartContentApiClientsBusiness } from '@/views/smart-content/service/axios.js'

class ServiceService {

  // get services

  async getAllServices(body) {
    try {
      const data = await smartContentApiClientsBusiness.get('/get-all-services/', body)
      return data
    } catch (error) {
      throw error
    }
  }
  //createServices
  async createServices(body) {
    try {
      const data = await smartContentApiClientsBusiness.post('/create-service/', body)
      return data
    } catch (error) {
      throw error
    }
  }




}

export default new ServiceService()
