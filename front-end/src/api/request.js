
import axiosInstance from './axiosInstance'
export default (params) => {
  return axiosInstance({
    method: 'get',
    baseURL: 'https://ali-city.showapi.com',
    headers: {
      'Authorization': 'APPCODE 91ba17e7e9284d3988a48b7fb685dd33'
    }
  })(params)
}