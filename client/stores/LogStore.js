// @flow

import { observable, action } from 'mobx'

import storageCaller from '../utils/StorageCaller'

import type {
  LogStorage, LogRequestUI, LogMeta, LogStorageRequests,
} from '../../types/Log'

const STORAGE_NAME = 'logs'

const storageToUI = (logStorageRequests: ?LogStorageRequests[]): LogRequestUI[] => {
  let logs: LogRequestUI[] = []
  let storageRequests = logStorageRequests || []
  storageRequests.forEach((l, i) => {
    if (l.type === 'RESPONSE') {
      return
    }
    let log: LogRequestUI = {
      url: l.url,
      method: l.method,
      stack: l.stack || '-',
      windowPath: l.windowPath || '-',
      requestDate: l.date,
      responseDate: '-',
      requestStatus: '-',
      description: l.description,
      requestError: l.requestError,
    }

    let response = storageRequests.filter((_, idx) => idx > i)
      .find(ls => ls.type === 'RESPONSE' && ls.url === l.url && ls.method === l.method)
    if (response) {
      log.responseDate = response.date
      log.requestStatus = String(response.requestStatus)
      log.description = response.description || log.description
      log.requestError = response.requestError || log.requestError
    }

    logs.push(log)
  })

  logs.sort((a, b) => new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime())
  return logs
}

class LogStore {
  @observable requests: LogRequestUI[] = []
  @observable meta: ?LogMeta = null

  @action
  loadLog() {
    let logStorage: LogStorage = storageCaller.getStore(STORAGE_NAME)
    let { requests, ...meta } = logStorage
    this.meta = meta
    this.requests = storageToUI(requests)
  }

  @action
  saveLog(log: LogStorage) {
    storageCaller.setStore(STORAGE_NAME, log)
    this.loadLog()
  }
}

export default new LogStore()
