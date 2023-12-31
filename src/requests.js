const API_BASE_URL = process.env.REACT_APP_API_URL

const request = (options) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Credentials': 'true',
  })

  const defaults = { headers: headers }
  options = Object.assign({}, defaults, options)

  return fetch(options.url, options)
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(response)
      }
      return response.json().then((json) => {
        return json
      })
    })
    .catch((err) => {
      if (err.status === 401) {
        window._logout()
      } else {
        return Promise.reject(err)
      }
    })
}

export function addHost(data) {
  return request({
    url: API_BASE_URL + '/host/add',
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function getAllZombies() {
  return request({
    url: API_BASE_URL + '/zombie/getAll',
    method: 'GET',
  })
}

export function getCombatStrategy(zombieId) {
  return request({
    url: API_BASE_URL + `/zombie/getCombatStrategy/${zombieId}`,
    method: 'GET',
  })
}
