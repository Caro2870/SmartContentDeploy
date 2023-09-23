import { smartContentApi, smartContentApiClientsBusiness  } from '@/views/smart-content/service/axios.js'

class PostsService {
  async getPosts(params) {
    try {
      const data = await smartContentApi.post('/posts/',params)
      return data
    } catch (error) {
      throw error
    }
  }

  async getPostById(params ) {
    try {
      const data = await smartContentApi.post('/posts/',params)
      return data
    } catch (error) {
      throw error
    }
  }

  async getClientsByUserId(params) {
    try {
      const data = await smartContentApiClientsBusiness.post('/get-select-clients/', params)
      return data
    } catch (error) {
      throw error
    }
  }

  async getBusinessesByClientId(params ) {
    try {
      const data = await smartContentApiClientsBusiness.post('/get-select-business/',params)
      return data
    } catch (error) {
      throw error
    }
  }

  async savePost(params) {
    try {
      const data = await smartContentApi.post('/save-post/', params, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return data
    } catch (error) {
      throw error
    }
  }

  async getPostChat(params) {
    try {
      const data = await smartContentApi.get('/get-post-chat/' + params.postId+ '/')
      return data
    } catch (error) {
      throw error
    }
  }

  async getPostDetail(params) {
    try {
      const data = await smartContentApi.get('/get-post-detail/'+ params.postId+ '/')
      return data
    } catch (error) {
      throw error
    }
  }

  async generatePost(params) {
    try {
      const data = await smartContentApi.post('/generate-post/', params)
      return data
    } catch (error) {
      throw error
    }
  }

  async sendMessage(params) {
    try {
      const data = await smartContentApi.post('/send-message/', params)
      return data
    } catch (error) {
      throw error
    }
  }

  async getBusinessServices(params) {
    try {
      const data = await smartContentApiClientsBusiness.get('/get-business-services/'+ params.businessId+ '/')
      return data
    } catch (error) {
      throw error
    }
  }

  async deletePost(params) {
    try {
      const data = await smartContentApi.delete('/delete-post/'+ params.postId+ '/')
      return data
    } catch (error) {
      throw error
    }
  }

  async updateMessage(params) {
    try {
      const data = await smartContentApi.put('/update-message/', params)
      return data
    } catch (error) {
      throw error
    }
  }

  async getSurveyQuestions(params) {
    try {
      const data = await smartContentApi.get('/get-survey-questions/')
      return data
    } catch (error) {
      throw error
    }
  }

  async saveSurvey(params) {
    try {
      const data = await smartContentApi.post('/save-survey/', params)
      return data
    } catch (error) {
      throw error
    }
  }

  async getSurveyData(params) {
    try {
      const data = await smartContentApi.get('/get-survey-answers/'+ params.postSurveyId+ '/')
      return data
    } catch (error) {
      throw error
    }
  }

  async uploadFile(params) {
    try {
      const data = await smartContentApi.post('/upload-file/', params, 
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
}

export default new PostsService()
