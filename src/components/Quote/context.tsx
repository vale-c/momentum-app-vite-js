import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect
} from 'react'

type StoicQuote = {
  author: string
  text: string
}

type QuoteContextType = {
  quote: StoicQuote
  fetchQuote: () => void
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined)

export const useQuote = () => {
  const context = useContext(QuoteContext)
  if (!context) {
    throw new Error('useQuote must be used within a QuoteProvider')
  }
  return context
}

export const QuoteProvider = ({ children }: { children: React.ReactNode }) => {
  const [quote, setQuote] = useState<StoicQuote>(() => {
    const localData = localStorage.getItem('stoicQuote')
    return localData ? JSON.parse(localData) : { author: '', text: '' }
  })

  const fetchQuote = useCallback(() => {
    if (!localStorage.getItem('stoicQuote')) {
      // Ensure fetch only if not in localStorage
      console.log('Fetching new quote since none in localStorage...')
      fetch('https://stoic-quotes.com/api/quote')
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setQuote(data)
            localStorage.setItem('stoicQuote', JSON.stringify(data))
          }
        })
        .catch((error) => {
          console.error('Failed to fetch Stoic quote:', error)
        })
    }
  }, [])

  // Initialize the quote if empty
  useEffect(() => {
    if (!quote.author && !localStorage.getItem('stoicQuote')) {
      fetchQuote()
    }
  }, [fetchQuote, quote.author])

  return (
    <QuoteContext.Provider value={{ quote, fetchQuote }}>
      {children}
    </QuoteContext.Provider>
  )
}
