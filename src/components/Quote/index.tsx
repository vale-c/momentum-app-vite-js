import { useEffect, useState } from 'react'

type StoicQuote = {
  author: string
  text: string
}

export const Quote = () => {
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
    fetchStoicQuote()
  }, [])

  return (
    <>
      {quote.author && quote.text && (
        <div className="absolute bottom-4 mx-8 mt-16 max-w-xl rounded-lg bg-black/40 sm:mx-0">
          <blockquote className="p-3 text-center text-sm italic text-white shadow-xl">
            “{quote.text}”
            <footer className="mt-2 text-sm font-semibold text-white">
              — {quote.author}
            </footer>
          </blockquote>
        </div>
      )}
    </>
  )
}
