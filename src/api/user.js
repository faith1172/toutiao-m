// 用户请求相关模块
import request from '@/utils/request'

export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

// 发送验证码  注意：每手机每分钟发送一次
export const sendSms = mobile => {
  return request({
    method: 'Get',
    url: '/app/v1_0/sms/codes/$(mobile)'
  })
}
