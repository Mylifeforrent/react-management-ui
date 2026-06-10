import axios, { AxiosError } from 'axios'
import { showLoading, hideLoading } from './loading'
import storage from './storage'
import env from '@/config'
import { Result } from '@/types/api'
import { message } from './AntdGlobal'
import { getMockResponse } from '@/mock'

// 创建实例
const instance = axios.create({
  timeout: 8000,
  timeoutErrorMessage: '请求超时，请稍后再试',
  withCredentials: true,
  headers: {
    icode: ''
  }
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    if (config.showLoading) showLoading()
    const token = storage.get('token')
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    if (env.mock) {
      config.baseURL = env.mockApi
    } else {
      config.baseURL = env.baseApi
    }
    return {
      ...config
    }
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  response => {
    const data: Result = response.data
    hideLoading()
    if (response.config.responseType === 'blob') return response as never
    if (data.code === 500001) {
      message.error(data.msg)
      storage.remove('token')
      location.href = '/login?callback=' + encodeURIComponent(location.href)
    } else if (data.code != 0) {
      if (response.config.showError === false) {
        return Promise.resolve(data) as never
      } else {
        message.error(data.msg)
        return Promise.reject(data)
      }
    }
    return data.data as never
  },
  error => {
    hideLoading()
    message.error(error.message)
    return Promise.reject(error.message)
  }
)

interface IConfig {
  showLoading?: boolean
  showError?: boolean
}

const defaultOptions: Required<IConfig> = {
  showLoading: true,
  showError: true
}

const requestMock = async <T>(url: string, method: 'get' | 'post', params?: object, options: IConfig = defaultOptions) => {
  if (options.showLoading) showLoading()
  const data = await getMockResponse<T>(url, method, params as Record<string, unknown> | undefined)
  hideLoading()
  if (data.code !== 0) {
    if (options.showError === false) return data as T
    message.error(data.msg)
    return Promise.reject(data)
  }
  return data.data
}

export default {
  get<T>(url: string, params?: object, options: IConfig = defaultOptions): Promise<T> {
    if (env.mock) return requestMock<T>(url, 'get', params, options)
    return instance.get(url, { params, ...options }) as Promise<T>
  },
  post<T>(url: string, params?: object, options: IConfig = defaultOptions): Promise<T> {
    if (env.mock) return requestMock<T>(url, 'post', params, options)
    return instance.post(url, params, options) as Promise<T>
  },
  downloadFile(url: string, data: object, fileName = 'fileName.xlsx') {
    if (env.mock) {
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json;charset=utf-8'
      })
      const link = document.createElement('a')
      link.download = fileName.replace(/\.xlsx$/, '.json')
      link.href = URL.createObjectURL(blob)
      document.body.append(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(link.href)
      return
    }
    instance({
      url,
      data,
      method: 'post',
      responseType: 'blob'
    }).then(response => {
      const blob = new Blob([response.data], {
        type: response.data.type
      })
      const name = (response.headers['file-name'] as string) || fileName
      const link = document.createElement('a')
      link.download = decodeURIComponent(name)
      link.href = URL.createObjectURL(blob)
      document.body.append(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(link.href)
    })
  }
}
