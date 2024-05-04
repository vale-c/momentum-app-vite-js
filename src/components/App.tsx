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

const App = () => {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: window.innerWidth,
    height: window.innerHeight
  })

  const [quote, setQuote] = useState<StoicQuote>({ author: '', text: '' })
  const [imageSeed, setImageSeed] = useState('seed')

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

  const handleResize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  useEffect(() => {
    const throttledResize = throttle(handleResize, 300)
    window.addEventListener('resize', throttledResize)
    fetchStoicQuote()

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
          <h1 className="text-9xl font-bold text-white drop-shadow-xl">
            {`${new Date().getHours()}:${new Date()
              .getMinutes()
              .toString()
              .padStart(2, '0')}`}
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
