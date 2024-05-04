import { useState, useEffect } from 'react'
import { throttle } from '../utils'

interface Dimensions {
  width: number
  height: number
}

interface StoicQuote {
  author: string
  text: string
}

const date = new Date()
const hours = date.getHours()
const minutes = date.getMinutes().toString().padStart(2, '0')

const generateRandomPicId = () => {
  const min = 0
  const max = 1083

  return Math.floor(Math.random() * (max - min + 1)) + min
}

const App = () => {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: window.innerWidth,
    height: window.innerHeight
  })

  const handleResize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  const [quote, setQuote] = useState<StoicQuote>({ author: '', text: '' })

  const fetchStoicQuote = async () => {
    try {
      const response = await fetch('https://stoic-quotes.com/api/quote')
      const data = await response.json()
      if (data) {
        setQuote(data)
      }
    } catch (error) {
      console.error('Failed to fetch Stoic quote:', error)
    }
  }

  useEffect(() => {
    const throttledResize = throttle(handleResize, 300)

    window.addEventListener('resize', throttledResize)
    fetchStoicQuote()

    return () => {
      window.removeEventListener('resize', throttledResize)
    }
  }, [])

  const imageUrl = `https://picsum.photos/id/${generateRandomPicId()}/${
    dimensions.width
  }/${dimensions.height}`

  return (
    <div
      className="h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center">
          <h1 className="text-9xl font-bold text-white drop-shadow-xl">
            {hours}:{minutes}
          </h1>
          {quote.author && quote.text && (
            <div className="absolute bottom-4 mx-8 mt-16 max-w-xl rounded-lg bg-black/40 sm:mx-0">
              <blockquote className="p-3 text-center text-xl italic text-white shadow-xl">
                “{quote.text}”
                <footer className="mt-2 text-lg font-semibold text-white">
                  — {quote.author}
                </footer>
              </blockquote>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
