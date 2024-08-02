import { Store } from '@tauri-apps/plugin-store'

const store = new Store('imperialist')

export const getStoredValue = async (key: string) => {
  const value = await store.get(key)
  return value
}

export const setStoredValue = async (key: string, value: string) => {
  await store.set(key, value)
  await store.save()
}
