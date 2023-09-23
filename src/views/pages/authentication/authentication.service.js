import { smartContentApiUsers } from '@/views/smart-content/service/axios.js'

class AuthenticationService {
  async signupGoogle(params) {
    try {
      const data = await smartContentApiUsers.post('/users/',params)
      return data
    } catch (error) {
      throw error
    }
  }

  async loginUser(params ) {
    try {
      const data = await smartContentApiUsers.post('/users/',params)
      return data
    } catch (error) {
      throw error
    }
  }

}

export default new AuthenticationService()
