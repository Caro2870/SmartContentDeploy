import { smartContentApiClientsBusiness } from '@/views/smart-content/service/axios.js'

class IndustryService {

  async getAllIndustries(body) {
    try {
      const data = await smartContentApiClientsBusiness.get('/get-industries/', body)
      return data
    } catch (error) {
      throw error
    }
  }



}

export default new IndustryService()
