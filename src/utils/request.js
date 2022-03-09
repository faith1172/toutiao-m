/**
 * 封装 axios 请求模块
 */
import axios from 'axios'

const request = axios.create({
  baseURL: 'https://www.liulongbin.top:8888/api/private/v1/' // 基础路径
})

export default request
