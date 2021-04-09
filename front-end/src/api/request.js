// 联调阿里云 全国省市区街道 api接口
import axios from 'axios'
export default (params) => {
  return axios.create({
    method: 'get',
    baseURL: 'https://ali-city.showapi.com',
    headers: {
      'Authorization': 'APPCODE 91ba17e7e9284d3988a48b7fb685dd33'
    },
    timeout: 600000
  })(params)
}