import { useState, useEffect } from 'react'
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiThunderstorm,
  WiFog,
  WiDayCloudy,
  WiDayRain,
  WiDaySnow
} from 'react-icons/wi'

type WeatherData = {
  temperature: number
  weatherCode: number
  description: string
}

const getWeatherIcon = (weatherCode: number) => {
  switch (weatherCode) {
    case 0:
      return <WiDaySunny className="size-16" />
    case 1:
    case 2:
      return <WiDayCloudy className="size-16" />
    case 3:
      return <WiCloudy className="size-16" />
    case 45:
    case 48:
      return <WiFog className="size-16" />
    case 51:
    case 53:
    case 55:
      return <WiDayRain className="size-16" />
    case 56:
    case 57:
      return <WiRain className="size-16" />
    case 61:
    case 63:
    case 65:
      return <WiDayRain className="size-16" />
    case 71:
    case 73:
    case 75:
      return <WiDaySnow className="size-16" />
    case 80:
    case 81:
    case 82:
      return <WiRain className="size-16" />
    case 95:
    case 96:
    case 99:
      return <WiThunderstorm className="size-16" />
    default:
      return <WiDaySunny className="size-16" />
  }
}

export const Weather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchWeather = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      )
      const data = await response.json()
      if (data.current_weather) {
        const { temperature, weathercode } = data.current_weather
        setWeather({
          temperature,
          weatherCode: weathercode,
          description: getWeatherDescription(weathercode)
        })
      } else {
        setError('Unable to fetch weather data.')
      }
    } catch (err) {
      setError('Error fetching weather data.')
    } finally {
      setLoading(false)
    }
  }

  const getWeatherDescription = (weatherCode: number) => {
    const descriptions: Record<number, string> = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Fog',
      48: 'Rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      56: 'Freezing drizzle',
      57: 'Dense freezing drizzle',
      61: 'Light rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      71: 'Light snow',
      73: 'Moderate snow',
      75: 'Heavy snow',
      80: 'Rain showers',
      81: 'Moderate rain showers',
      82: 'Violent rain showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm with hail',
      99: 'Violent thunderstorm'
    }
    return descriptions[weatherCode] || 'Unknown weather condition'
  }

  const getLocationAndFetchWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          fetchWeather(latitude, longitude)
        },
        () => {
          setError('Geolocation is not supported or permission denied.')
          setLoading(false)
        }
      )
    } else {
      setError('Geolocation is not supported by your browser.')
      setLoading(false)
    }
  }

  useEffect(() => {
    getLocationAndFetchWeather()
  }, [])

  if (loading) {
    return <div className="text-center text-white">Loading...</div>
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>
  }

  if (!weather) {
    return null
  }

  return (
    <div className="flex flex-col items-center rounded-lg p-4 text-center text-white">
      {getWeatherIcon(weather.weatherCode)}
      <h2 className="text-2xl font-bold">{weather.temperature}°C</h2>
      <p>{weather.description}</p>
    </div>
  )
}
