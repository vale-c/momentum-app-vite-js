import { useState, useEffect } from 'react'
import { throttle } from '../utils'
import { Quote } from './Quote'
import { Time } from './Time'
import { Greeting } from './Greeting'

interface BgDimensions {
  width: number
  height: number
}

const App = () => {
  const [dimensions, setDimensions] = useState<BgDimensions>({
    width: window.innerWidth,
    height: window.innerHeight
  })

  const [imageSeed, setImageSeed] = useState('picsumSeed')

  const handleResize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  useEffect(() => {
    const throttledResize = throttle(handleResize, 300)
    window.addEventListener('resize', throttledResize)

    return () => {
      window.removeEventListener('resize', throttledResize)
    }
  }, [])

  const refreshBg = () => {
    setImageSeed(Date.now().toString())
  }

  const imageUrl = `https://picsum.photos/seed/${imageSeed}/${dimensions.width}/${dimensions.height}`

  return (
    <div
      className="h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center">
          <Time />
          <Greeting />
          <Quote />
          <button
            className="fixed bottom-4 right-4 hidden rounded-lg bg-black/50 px-4 py-2 text-white transition-colors hover:bg-white hover:text-black sm:block"
            onClick={refreshBg}
          >
            🔄🖼️
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
