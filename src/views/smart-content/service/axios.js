// axios
import axios from 'axios'

// eslint-disable-next-line import/prefer-default-export - generation
export const smartContentApi = axios.create({
  baseURL: 'https://smartcontent.eastus.cloudapp.azure.com/generation/',
  // baseURL: 'https://neural-guard-366803.rj.r.appspot.com/api/v1',
  // params: {}
})

//- users
export const smartContentApiUsers = axios.create({   
  baseURL: 'https://smartcontent.eastus.cloudapp.azure.com/users/',
  // baseURL: 'https://neural-guard-366803.rj.r.appspot.com/api/v1',
  // params: {}
})
//- business
export const smartContentApiClientsBusiness = axios.create({
  baseURL: 'https://smartcontent.eastus.cloudapp.azure.com/business/',
  // baseURL: 'https://neural-guard-366803.rj.r.appspot.com/api/v1',
  // params: {}
})
