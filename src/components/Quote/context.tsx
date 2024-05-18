import React, { createContext, useState, useContext, useCallback } from 'react'

type StoicQuote = {
  author: string
  text: string
}

type QuoteContextType = {
  quote: StoicQuote
  fetchQuote: (forceUpdate?: boolean) => void
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
    const savedQuote = localStorage.getItem('stoicQuote')
    return savedQuote ? JSON.parse(savedQuote) : { author: '', text: '' }
  })

  const fetchQuote = useCallback(async (forceUpdate = false) => {
    // Only fetch new quote if there is no quote in localStorage or if forceUpdate is true
    if (forceUpdate || !localStorage.getItem('stoicQuote')) {
      console.log(
        forceUpdate
          ? 'Force updating quote...'
          : 'No quote found in localStorage, fetching new quote...'
      )
      try {
        const response = await fetch('https://stoic-quotes.com/api/quote')
        const data = await response.json()
        setQuote(data)
        localStorage.setItem('stoicQuote', JSON.stringify(data))
      } catch (error) {
        console.error('Failed to fetch Stoic quote:', error)
      }
    }
  }, [])

  return (
    <QuoteContext.Provider value={{ quote, fetchQuote }}>
      {children}
    </QuoteContext.Provider>
  )
}
