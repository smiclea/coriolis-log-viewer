// @flow

class StorageCaller {
  getStore(name: string) {
    return JSON.parse(localStorage.getItem(name) || '{}')
  }

  setStore(name: string, value: any) {
    localStorage.setItem(name, JSON.stringify(value))
  }
}

export default new StorageCaller()
