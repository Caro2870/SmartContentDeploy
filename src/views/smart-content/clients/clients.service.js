import { smartContentApiClientsBusiness } from '@/views/smart-content/service/axios.js'

class ClientService {

  async getAllClients(body) {
    try {
      console.log('getAllClients', body)
      const data = await smartContentApiClientsBusiness.post('/get-all-clients/', body)
      return data
    } catch (error) {
      throw error
    }
  }

  //update-client
  async updateClient(body) {
    try {
      const data = await smartContentApiClientsBusiness.put('/update-client/', body,
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

  //create-client
  async createClient(body) {
    try {
      const data = await smartContentApiClientsBusiness.post('/create-client/', body,
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

  //create-address
  async createAddress(body) {
    try {
      const data = await smartContentApiClientsBusiness.post('/create-address/', body)
      return data
    } catch (error) {
      throw error
    }
  }

  //http://localhost:8000/get-client-by-id/1
  async getClientByIdA(body) {
    try {
      console.log('getClientById', body)
      const data = await smartContentApiClientsBusiness.post('/get-client-by-id/', body)

      return data
    } catch (error) {
      throw error
    }
  }

}

export default new ClientService()
