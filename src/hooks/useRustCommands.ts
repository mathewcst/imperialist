import { invoke } from '@tauri-apps/api/core'

type RustCommand = 'toggle' | 'close'

export const useRustCommands = () => {
  const invokeCommand = async (command: RustCommand) => {
    await invoke(command)
  }

  return { invokeCommand }
}
