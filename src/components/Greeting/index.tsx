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
      <h2 className="mx-8 mt-2 text-center text-3xl font-normal capitalize text-white drop-shadow-xl sm:mx-8">
        {greeting}, {coolName}
      </h2>
    </>
  )
}
