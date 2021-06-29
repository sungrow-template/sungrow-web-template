import axios from 'axios'
import store from '../store/index'
import { Message } from 'element-ui'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

axios.defaults.baseURL = process.env.VUE_APP_API_ROOT

// 添加请求拦截器
axios.interceptors.request.use(config => {
  const token = store.state.user.token
  if (token) {
    config.headers.token = token
  }
  return config
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(response => {
  // 对响应数据做点什么
  return response
}, error => {
  // 对响应错误做点什么
  Message.error('网络请求错误，请稍后重试')
  return Promise.reject(error)
})

export default {
  get: (url, params = {}) => {
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params: params
      }).then((response) => {
        const data = response.data
        resolve(data)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  post: (url, params = {}) => {
    return new Promise((resolve, reject) => {
      axios.post(url, JSON.stringify(params)).then((response) => {
        const data = response.data
        resolve(data)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  postForm: (url, params) => {
    let jstring = ''
    for (const key in params) {
      jstring = jstring + key + '=' + params[key] + '&'
    }
    return new Promise((resolve, reject) => {
      axios.post(url, jstring, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        const data = response.data
        resolve(data)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  form: (url, params) => {
    return new Promise((resolve, reject) => {
      axios.post(url, params, {
        headers: {
          'Content-Type': ' multipart/form-data'
        }
      }).then((response) => {
        const data = response.data
        resolve(data)
      }).catch((err) => {
        reject(err)
      })
    })
  }
}
