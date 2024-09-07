import React, { useState, useEffect, useRef, useMemo } from 'react'
import { FaSearch } from 'react-icons/fa'
import Fuse from 'fuse.js'
import commonWords from 'common-words'

type SearchProps = {
  onSearch: (query: string) => void
}

const prepareSearchTerms = () => {
  const words = commonWords.map((item) => item.word)
  const phrases = []
  for (let i = 0; i < words.length - 1; i++) {
    phrases.push(`${words[i]} ${words[i + 1]}`)
  }
  return [...new Set([...words, ...phrases])].slice(0, 5000)
}

const searchTerms = prepareSearchTerms()

export const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  const fuse = useMemo(
    () =>
      new Fuse(searchTerms, {
        threshold: 0.4,
        distance: 100,
        minMatchCharLength: 2,
        shouldSort: true,
        findAllMatches: true,
        ignoreLocation: true,
        keys: ['word']
      }),
    []
  )

  const getSuggestions = (input: string) => {
    const fuseResults = fuse.search(input, { limit: 10 })
    const fuseWords = fuseResults.map((result) => result.item)

    const exactMatches = searchTerms
      .filter((term) => term.toLowerCase().startsWith(input.toLowerCase()))
      .slice(0, 5)

    return Array.from(new Set([...exactMatches, ...fuseWords])).slice(0, 5)
  }

  useEffect(() => {
    if (query.length > 1) {
      const newSuggestions = getSuggestions(query)
      setSuggestions(newSuggestions)
      setShowSuggestions(newSuggestions.length > 0)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
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
      window.open(
        `https://www.google.com/search?q=${encodeURIComponent(query)}`,
        '_blank'
      )
      onSearch(query)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    setShowSuggestions(false)
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(suggestion)}`,
      '_blank'
    )
    onSearch(suggestion)
  }

  const highlightMatch = (text: string, query: string) => {
    const regex = new RegExp(`(${query})`, 'gi')
    return text.split(regex).map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 font-medium text-gray-800">
          {part}
        </mark>
      ) : (
        part
      )
    )
  }

  return (
    <div ref={searchRef} className="relative mx-auto mt-4 w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search..."
          className="w-full rounded-lg bg-white/20 px-6 py-3 pr-12 text-lg text-white backdrop-blur-sm placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white transition-colors hover:text-white/80"
        >
          <FaSearch size={24} />
        </button>
      </form>
      {showSuggestions && (
        <div className="absolute z-10 mt-2 w-full rounded-lg bg-white/95 py-2 shadow-lg backdrop-blur-sm">
          {suggestions.length > 0 ? (
            <ul>
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="cursor-pointer px-6 py-3 text-gray-800 transition-colors hover:bg-gray-100"
                >
                  {highlightMatch(suggestion, query)}
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-6 py-3 italic text-gray-500">
              No suggestions found
            </p>
          )}
        </div>
      )}
    </div>
  )
}
