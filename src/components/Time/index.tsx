import { useEffect, useState } from 'react'
import { formatDateTime, getCurrentDate } from '../../utils'

export const Time = () => {
  const [timeInfo, setTimeInfo] = useState(() =>
    formatDateTime(getCurrentDate())
  )

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeInfo(formatDateTime(getCurrentDate()))
    }, 60000) // Update time every minute

    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <h1 className="text-8xl font-light text-white text-shadow-soft-black">
        {timeInfo.hours}
      </h1>
      <h3 className="text-2xl font-thin text-white text-shadow-soft-black">
        {timeInfo.dayOfWeek}
      </h3>
    </>
  )
}
