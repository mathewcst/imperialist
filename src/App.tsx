import { invoke } from '@tauri-apps/api/core'

function App() {
  const handleClose = async () => {
    await invoke('toggle')
  }

  return (
    <div className='w-[300px] h-[400px] bg-slate-500 flex flex-col justify-center items-center'>
      <h1>Imperialist</h1>
      <button onClick={handleClose}>Close</button>
    </div>
  )
}

export default App
