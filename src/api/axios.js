import axios from 'axios'
import store from '@/store'
import { Message } from "element-ui"

const pendingMap = new Map()

function myAxios(axiosConfig) {
  const service = axios.create({
    baseURL: '/', // 设置统一的请求前缀
    timeout: 10000, // 设置统一的超时时长
  })

  // 请求拦截
  service.interceptors.request.use(config => {
      removePending(config)
      addPending(config)
      const token = store.state.user.token
      if (token) {
        config.headers.token = token
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  // 响应拦截
  service.interceptors.response.use(
    response => {
      removePending(response.config)
      return response
    }, error => {
      error.config && removePending(error.config)
      Message.error('网络请求错误，请稍后重试')
      return Promise.reject(error)
    }
  )

  return service(axiosConfig)
}

export default myAxios


/**
 * 储存每个请求的唯一cancel回调, 以此为标识
 * @param {*} config
 */
function addPending(config) {
  const pendingKey = getPendingKey(config)
  config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
    if (!pendingMap.has(pendingKey)) {
      pendingMap.set(pendingKey, cancel)
    }
  })
}

/**
 * 删除重复的请求
 * @param {*} config
 */
function removePending(config) {
  const pendingKey = getPendingKey(config)
  if (pendingMap.has(pendingKey)) {
    const cancelToken = pendingMap.get(pendingKey)
    cancelToken(pendingKey)
    pendingMap.delete(pendingKey)
  }
}

/**
 * 生成唯一的每个请求的唯一key
 * @param {*} config
 * @returns
 */
function getPendingKey(config) {
  let {url, method, params, data} = config
  if(typeof data === 'string') data = JSON.parse(data) // response里面返回的config.data是个字符串对象
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&')
}
