import React, { useState, useEffect, useRef, KeyboardEvent } from 'react'
import { FaSearch } from 'react-icons/fa'

type SearchEngine = {
  name: string
  url: string
}

type SearchProps = {
  onSearch: (query: string) => void
  selectedEngine: SearchEngine
}

export const Search: React.FC<SearchProps> = ({ onSearch, selectedEngine }) => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length > 1) {
        try {
          const response = await fetch(
            `https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(
              query
            )}&limit=5&namespace=0&format=json&origin=*`
          )
          const data = await response.json()
          setSuggestions(data[1])
          setShowSuggestions(true)
          setSelectedIndex(-1)
        } catch (error) {
          console.error('Error fetching suggestions:', error)
        }
      } else {
        setSuggestions([])
        setShowSuggestions(false)
      }
    }

    const timeoutId = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(timeoutId)
  }, [query])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query) {
      window.open(`${selectedEngine.url}${encodeURIComponent(query)}`, '_blank')
      onSearch(query)
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    setShowSuggestions(false)
    window.open(
      `${selectedEngine.url}${encodeURIComponent(suggestion)}`,
      '_blank'
    )
    onSearch(suggestion)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault()
      handleSuggestionClick(suggestions[selectedIndex])
    }
  }

  return (
    <div ref={searchRef} className="relative mt-4 w-full max-w-md">
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          placeholder={`Search with ${selectedEngine.name}...`}
          className="w-full rounded-lg bg-white/10 px-4 py-3 pr-12 text-white backdrop-blur-md transition-all duration-300 ease-in-out placeholder:text-white/80 focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 transition-colors duration-200 hover:text-white"
        >
          <FaSearch size={18} />
        </button>
      </form>
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 mt-2 w-full rounded-lg bg-white/90 py-2 shadow-lg backdrop-blur-md transition-all duration-300 ease-in-out">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              onMouseEnter={() => setSelectedIndex(index)}
              className={`cursor-pointer px-4 py-2 text-gray-800 transition-colors duration-200 hover:bg-gray-200 ${
                index === selectedIndex ? 'bg-gray-300' : ''
              }`}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
