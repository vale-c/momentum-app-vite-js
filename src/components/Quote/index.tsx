import { useEffect } from 'react'
import { useQuote } from './context'

export const Quote = () => {
  const { quote, fetchQuote } = useQuote()

  useEffect(() => {
    fetchQuote()
  }, [fetchQuote])

  return (
    <>
      {quote.author && quote.text && (
        <div className="absolute bottom-4 mx-8 mt-16 max-w-xl rounded-lg bg-black/40 sm:mx-0">
          <blockquote className="p-3 text-center text-base italic shadow-xl">
            “{quote.text}”
            <footer className="mt-2 text-base font-semibold">
              — {quote.author}
            </footer>
          </blockquote>
        </div>
      )}
    </>
  )
}
