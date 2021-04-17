
import axiosInstance from './axiosInstance';
export default (params) => {
  return axiosInstance({
    baseURL: "http://localhost:7001",
  })(params)
}