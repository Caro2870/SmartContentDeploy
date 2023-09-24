// axios
import axios from 'axios'

// eslint-disable-next-line import/prefer-default-export - generation
export const smartContentApi = axios.create({
  //baseURL: 'http://localhost:8000/generation/',
   baseURL: 'https://smartcontent.eastus.cloudapp.azure.com/generation/',
  // baseURL: 'https://neural-guard-366803.rj.r.appspot.com/api/v1',
  // params: {}
})

//- users
export const smartContentApiUsers = axios.create({ 
  //baseURL: 'http://localhost:8001/users/',  
   baseURL: 'https://smartcontent.eastus.cloudapp.azure.com/users/',
  // baseURL: 'https://neural-guard-366803.rj.r.appspot.com/api/v1',
  // params: {}
})
//- business
export const smartContentApiClientsBusiness = axios.create({
  // baseURL: 'http://localhost:8002/business/',
  baseURL: 'https://smartcontent.eastus.cloudapp.azure.com/business/',
  // baseURL: 'https://neural-guard-366803.rj.r.appspot.com/api/v1',
  // params: {}
})
