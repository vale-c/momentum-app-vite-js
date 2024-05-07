import React, { createContext, useState, useContext, useCallback } from 'react'

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
  if (context === undefined) {
    throw new Error('useQuote must be used within a QuoteProvider')
  }
  return context
}

export const QuoteProvider = ({ children }: { children: React.ReactNode }) => {
  const [quote, setQuote] = useState<StoicQuote>({ author: '', text: '' })

  const fetchQuote = useCallback(async () => {
    try {
      const response = await fetch('https://stoic-quotes.com/api/quote')
      const data = await response.json()
      if (data) {
        setQuote(data)
      }
    } catch (error) {
      console.error('Failed to fetch Stoic quote:', error)
    }
  }, [])

  return (
    <QuoteContext.Provider value={{ quote, fetchQuote }}>
      {children}
    </QuoteContext.Provider>
  )
}
