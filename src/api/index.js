import myAxios from './axios';

export function getListAPI(paramsList) {
  return myAxios ({
    url: '/api/list',
    method: 'get',
    params: paramsList
  })
}

export function postForm(paramsList) {
  return myAxios ({
    url: '/api/submit',
    method: 'post',
    data: paramsList,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [
      (data) => {
        let result = ''
        for (let key in data) {
          result += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&'
        }
        return result.slice(0, result.length - 1)
      }
    ]
  })
}

export function login(paramsList) {
  return myAxios ({
    url: '/api/login',
    method: 'post',
    data: paramsList
  })
}
