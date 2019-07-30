// @flow

export type LogStorageRequests = {
  url: string,
  method: string,
  type: 'REQUEST' | 'RESPONSE',
  date: string,
  description?: string,
  requestStatus?: number | 'canceled',
  requestError?: any,
  windowPath?: string,
  stack?: string,
}

export type LogStorage = {
  requests?: LogStorageRequests[],
  userAgent?: string,
  platform?: string,
  version?: string,
}

export type LogMeta = {
  userAgent?: string,
  platform?: string,
  version?: string,
}

export type LogRequestUI = {
  url: string,
  method: string,
  stack: string,
  windowPath: string,
  requestDate: string,
  responseDate: string,
  requestStatus: string,
  description?: string,
  requestError?: any,
}
