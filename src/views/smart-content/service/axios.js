// axios
import axios from 'axios'

// eslint-disable-next-line import/prefer-default-export - generation
export const smartContentApi = axios.create({
  baseURL: 'https://20.106.131.22/generation/',
  // baseURL: 'https://neural-guard-366803.rj.r.appspot.com/api/v1',
  // params: {}
})

//- users
export const smartContentApiUsers = axios.create({   
  baseURL: 'https://20.106.131.22/users/',
  // baseURL: 'https://neural-guard-366803.rj.r.appspot.com/api/v1',
  // params: {}
})
//- business
export const smartContentApiClientsBusiness = axios.create({
  baseURL: 'https://20.106.131.22/business/',
  // baseURL: 'https://neural-guard-366803.rj.r.appspot.com/api/v1',
  // params: {}
})
