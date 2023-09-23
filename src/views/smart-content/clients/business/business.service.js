import { smartContentApiClientsBusiness } from '@/views/smart-content/service/axios.js'

class BusinessService {

  async createBusiness(body) {
    try {
      const data = await smartContentApiClientsBusiness.post('/create-business/', body,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return data
    } catch (error) {
      throw error
    }
  }
  async updateBusiness(body) {
    try {
      const data = await smartContentApiClientsBusiness.put('/update-business/', body,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return data
    } catch (error) {
      throw error
    }
  }
  //upload-copies subir archivo excel
  async uploadCopies(body) {
    try {
      const data = await smartContentApiClientsBusiness.post('/upload-copies/', body,
        { headers: { 'Content-Type': 'multipart/form-data' } })
      return data
    } catch (error) {
      throw error
    }
  }



}

export default new BusinessService()
