import { useState, useEffect } from 'react'
import { Quote } from './Quote'
import { Time } from './Time'
import { Greeting } from './Greeting'

interface BgDimensions {
  width: number
  height: number
}

const App = () => {
  const [dimensions, setDimensions] = useState<BgDimensions>({
    width: 0,
    height: 0
  })
  const [imageSeed, setImageSeed] = useState('random-image-seed')
  const imageAspectRatio = 16 / 9 // Assuming the image has a 16:9 aspect ratio

  const handleResize = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    const windowAspectRatio = width / height

    let newWidth = width
    let newHeight = height

    if (windowAspectRatio > imageAspectRatio) {
      // Window is wider than the image aspect ratio
      newHeight = Math.round(width / imageAspectRatio)
    } else {
      // Window is taller than the image aspect ratio
      newWidth = Math.round(height * imageAspectRatio)
    }

    setDimensions({ width: newWidth, height: newHeight })
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const refreshBg = () => {
    setImageSeed(Date.now().toString())
  }

  const imageUrl = `https://picsum.photos/seed/${imageSeed}/${dimensions.width}/${dimensions.height}?blur=10`

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
            className="fixed bottom-4 right-4 rounded-lg bg-black/50 px-4 py-2 text-white transition-colors hover:bg-white hover:text-black sm:block"
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
