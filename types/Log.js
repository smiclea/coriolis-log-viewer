// @flow

export type LogStorage = {
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

export type LogUI = {
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
