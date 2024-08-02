const WEATHER_API_URL = 'https://api.weatherapi.com/v1'

export const getWeather = async () => {
  const response = await fetch(
    `${WEATHER_API_URL}/current.json?q=auto:ip&key=${
      import.meta.env.VITE_WEATHER_API_KEY
    }`
  )
  const data = await response.json()

  return data
}
