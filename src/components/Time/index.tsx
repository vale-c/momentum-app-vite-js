import { hours, minutes } from '../../utils'

export const Time = () => {
  return (
    <h1 className="text-9xl font-bold text-white drop-shadow-xl">
      {hours}:{minutes}
    </h1>
  )
}
