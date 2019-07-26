// @flow

import axios from 'axios'

type Config = {
  method?: 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH',
  url: string,
  data?: any,
  quietError?: boolean,
}

const redirect = (statusCode: number) => {
  if (statusCode === 401) {
    if (window.location.hash.indexOf('login') === -1 && window.location.pathname.indexOf('login') === -1) {
      let currentPath = '?prev=/'
      if (window.location.pathname !== '/') {
        currentPath = `?prev=${window.location.pathname}`
      } else if (window.location.hash) {
        currentPath = `?prev=${window.location.hash.replace('#', '')}`
      }
      window.location.href = `${window.env.BASENAME}/login${currentPath}`
    }
  }
}

class ApiCaller {
  async send(config: Config) {
    let url = `${window.env.NODE_API}${config.url}`
    let response
    try {
      response = await axios.request({ ...config, url })
    } catch (error) {
      let message
      let title
      if (error.response) {
        redirect(error.response.status)
        message = error.response.data.error.message
        title = error.response.data.error.title
      } else if (error.request) {
        message = 'No server response'
      } else {
        message = error.message
      }
      if (!config.quietError) {
        console.error({ message, title, level: 'error' })
      }
      throw new Error(message)
    }
    return response.data
  }
}

export default new ApiCaller()
