import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.withCredentials = true // Check cross-site Access-Control

const service = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000
})

// 添加请求拦截器
service.interceptors.request.use(function(config) {
  // 在发送请求之前做些什么
  return config
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
service.interceptors.response.use(function(response) {
  return response
}, function(error) {
  return Promise.reject(error)
})

// 封装自己的get/post方法
export default service
