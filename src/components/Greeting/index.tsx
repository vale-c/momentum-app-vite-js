import { greeting, coolNames } from '../../utils'

const getCoolName = () => {
  return coolNames[Math.floor(Math.random() * coolNames.length)]
}

export const Greeting = () => {
  return (
    <h2 className="mt-2 text-4xl font-semibold text-white drop-shadow-xl">
      {greeting()}, {getCoolName()}
    </h2>
  )
}
