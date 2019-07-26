// @flow

class StorageCaller {
  getStoreArray(name: string): any[] {
    let items: any[] = JSON.parse(localStorage.getItem(name) || '[]')
    return items
  }

  setStore(name: string, value: any) {
    localStorage.setItem(name, JSON.stringify(value))
  }
}

export default new StorageCaller()
