// @flow

import { observable, action } from 'mobx'

import storageCaller from '../utils/StorageCaller'

import type { LogStorage, LogUI } from '../../types/Log'

const STORAGE_NAME = 'logs'

const storageToUI = (logsStorage: LogStorage[]): LogUI[] => {
  let logs: LogUI[] = []

  logsStorage.forEach((l, i) => {
    if (l.type === 'RESPONSE') {
      return
    }
    let log: LogUI = {
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

    let response = logsStorage.filter((_, idx) => idx > i)
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
  @observable logs: LogUI[] = []

  @action
  loadLogs() {
    this.logs = storageToUI(storageCaller.getStoreArray(STORAGE_NAME))
  }

  @action
  saveLogs(logs: LogStorage[]) {
    this.logs = storageToUI(logs)
    storageCaller.setStore(STORAGE_NAME, logs)
  }
}

export default new LogStore()
