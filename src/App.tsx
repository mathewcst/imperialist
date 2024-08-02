import { Temperature } from './components/Temperature'

function App() {
  return (
    <div className='w-[300px] h-[400px] bg-neutral-800/50 flex flex-col justify-start items-start gap-4'>
      <main className='flex flex-col items-start justify-start gap-4 p-4'>
        <Temperature />
      </main>
    </div>
  )
}

export default App
