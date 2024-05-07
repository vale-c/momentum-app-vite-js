import { useEffect, useState } from 'react'
import { greeting, coolNames } from '../../utils'

export const Greeting = () => {
  const [coolName, setCoolName] = useState('')

  const getCoolName = () => {
    setCoolName(coolNames[Math.floor(Math.random() * coolNames.length)])
  }

  useEffect(() => {
    getCoolName()
  }, [])

  return (
    <>
      <h2 className="mt-2 text-4xl font-normal capitalize text-white drop-shadow-xl">
        {greeting}, {coolName}
      </h2>
    </>
  )
}
