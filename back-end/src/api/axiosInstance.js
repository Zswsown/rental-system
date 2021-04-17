import axios from 'axios'
const axiosInstance = ({ baseURL, headers }) => {
  const instance = axios.create({
    baseURL,
    headers,
    timeout: 6000000
  })
  // 默认携带认证
  instance.defaults.withCredentials = true
  // 添加请求拦截器
  instance.interceptors.request.use(function (config) {
    // console.log(config)
    return config
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  })

  // 添加响应拦截器
  instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // console.log("响应拦截成功", response)
    if (response.status === 200) {
      return response
    }
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  })
  return instance
}

export default axiosInstance



