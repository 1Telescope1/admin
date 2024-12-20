import { message } from 'antd';
import axios, { type Method } from 'axios'

export interface Result{
  status: number
  data: any
  message: string | null,
  success: boolean
}
// 1. 新axios实例，基础配置
const baseURL = import.meta.env.VITE_BASE_API;
const instance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
});
// 2. 请求拦截器，携带token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    const username = localStorage.getItem('username')    
    if (token && username && config.headers) {
      config.headers.token = `${token}`;
      config.headers.username = `${username}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);
// 3. 响应拦截器，剥离无效数据，401拦截
instance.interceptors.response.use(
  (res) => {    
    if (res.data?.code != 200) {
      message.error(res.data.message);
      return Promise.reject(res.data);
    }
    return res.data;
  },
  (err) => {    
    const response = err.response.data
    if (err.response.status == 500) {
      // notification("error", err.response.statusText, "error")
    } else {
      // notification("error", response.data, "error")
    }
    console.log(err);
    
    message.success('This is a success message');
    return Promise.reject(err);
  }
);
export const request = <T>(
  url: string,
  method: Method = 'GET',
  submitData?: object,
  params?: Object
) => {
  // 参数：地址，请求方式，提交的数据
  // 返回：promise
  return instance.request<any, Result>({
    url,
    method,
    [method.toUpperCase() === 'GET' ? 'params' : 'data']: submitData,
    params
  })
}