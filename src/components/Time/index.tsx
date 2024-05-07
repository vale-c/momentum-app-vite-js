import { hours as currentTime, dayOfWeek as currentDay } from '../../utils'

export const Time = () => {
  return (
    <>
      <h1 className="text-8xl font-light text-white text-shadow-soft-black">
        {currentTime}
      </h1>
      <h3 className="text-2xl font-thin text-white text-shadow-soft-black">
        {currentDay}
      </h3>
    </>
  )
}
