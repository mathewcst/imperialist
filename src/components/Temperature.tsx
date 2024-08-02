import { useEffect, useState } from 'react'
import { formatDate } from '../lib/date'
import { getWeather } from '../lib/weather'

const FIVE_SECONDS = 1000 * 5

export const Temperature = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [city, setCity] = useState('')
  const [fahrenheit, setFahrenheit] = useState(0)
  const [celsius, setCelsius] = useState(0)

  let formattedDate = formatDate(currentTime)
  //const celsius = fahrenheit > 0 ? ((fahrenheit - 32) * 5) / 9 : 0

  useEffect(() => {
    const updateTime = setInterval(() => {
      setCurrentTime(new Date())
    }, FIVE_SECONDS)

    // TODO: add a "last updated" time and "refetch" button
    getWeather().then((data) => {
      const { temp_c, temp_f } = data.current
      const { name, country } = data.location
      setFahrenheit(temp_f)
      setCelsius(temp_c)
      setCity(`${name}, ${country}`)
    })

    return () => clearInterval(updateTime)
  }, [])

  return (
    <div className='flex flex-row items-center justify-center gap-2'>
      <span className='text-neutral-200'>{formattedDate}</span>
      <span className='text-neutral-200'>{city}</span>
      <span className='text-neutral-200'>{fahrenheit}&deg;F</span>
      <span className='text-neutral-200'>{celsius}&deg;C</span>
    </div>
  )
}
