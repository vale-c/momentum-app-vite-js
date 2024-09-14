import { useState, useCallback, useEffect, useMemo } from 'react'
import { Quote } from './Quote'
import { Time } from './Time'
import { Search } from './Search'
import { Settings } from './Settings'
import { SettingsModal } from './Settings/SettingsModal'
import { Weather } from './Weather'
import fallbackImage from '../assets/sf-bg.avif'
import { getGreeting, getCurrentDate } from '../utils'
import { searchEngines } from './Settings/SettingsModal'
import type {
  BgSource,
  Settings as SettingsType,
  SearchEngine,
  Frequency
} from './Settings/SettingsModal'
import { useQuote } from './Quote/context'

type AppState = {
  dimensions: { width: number; height: number }
  imageSeed: string
  bgSource: BgSource
  customImageUrl: string
  imageUrl: string
  blur: number
  brightness: number
  greeting: string
  greetingName: string
  isSettingsOpen: boolean
  settings: SettingsType
  searchQuery: string
  selectedEngine: SearchEngine
  bgFrequency: Frequency
  lastBackgroundChange: string
  quoteFrequency: Frequency
  lastQuoteChange: string
}

const App = () => {
  const [state, setState] = useState<AppState>(() => ({
    dimensions: { width: window.innerWidth, height: window.innerHeight },
    bgSource: (localStorage.getItem('bgSource') as BgSource) || 'picsum',
    customImageUrl: localStorage.getItem('customImageUrl') || '',
    imageUrl: fallbackImage,
    blur: parseInt(localStorage.getItem('blur') || '5'),
    brightness: parseInt(localStorage.getItem('brightness') || '100'),
    greeting: getGreeting(getCurrentDate()),
    greetingName: localStorage.getItem('greetingName') || 'friend',
    isSettingsOpen: false,
    settings: {
      showGreeting: JSON.parse(localStorage.getItem('showGreeting') || 'true'),
      showQuote: JSON.parse(localStorage.getItem('showQuote') || 'true'),
      showWeather: JSON.parse(localStorage.getItem('showWeather') || 'true'),
      showSearch: JSON.parse(localStorage.getItem('showSearch') || 'false')
    },
    searchQuery: '',
    selectedEngine: searchEngines[0],
    imageSeed: localStorage.getItem('imageSeed') || Math.random().toString(),
    bgFrequency:
      (localStorage.getItem('bgFrequency') as Frequency) || 'everyDay',
    lastBackgroundChange: localStorage.getItem('lastBackgroundChange') || '0',
    quoteFrequency:
      (localStorage.getItem('quoteFrequency') as Frequency) || 'everyDay',
    lastQuoteChange: localStorage.getItem('lastQuoteChange') || '0'
  }))

  const { fetchQuote } = useQuote()

  const updateState = useCallback((updates: Partial<AppState>) => {
    setState((prevState) => ({ ...prevState, ...updates }))
  }, [])

  const updateLocalStorage = useCallback((key: string, value: string) => {
    localStorage.setItem(key, value)
  }, [])

  const generateNewImageSeed = useCallback(() => {
    const newSeed = Math.random().toString()
    const now = Date.now().toString()
    updateLocalStorage('imageSeed', newSeed)
    updateLocalStorage('lastBackgroundChange', now)
    updateState({ imageSeed: newSeed, lastBackgroundChange: now })
  }, [updateLocalStorage, updateState])

  const generateNewQuote = useCallback(() => {
    const now = Date.now().toString()
    updateLocalStorage('lastQuoteChange', now)
    updateState({ lastQuoteChange: now })
    fetchQuote(true)
  }, [fetchQuote, updateLocalStorage, updateState])

  const checkAndUpdateBackground = useCallback(() => {
    const now = Date.now()
    const lastChange = parseInt(state.lastBackgroundChange)
    const shouldUpdate =
      state.bgFrequency === 'everyTab' ||
      (state.bgFrequency === 'everyHour' && now - lastChange > 3600000) ||
      (state.bgFrequency === 'everyDay' && now - lastChange > 86400000)

    if (state.bgFrequency !== 'pause' && shouldUpdate) {
      generateNewImageSeed()
    }
  }, [state.bgFrequency, state.lastBackgroundChange, generateNewImageSeed])

  const checkAndUpdateQuote = useCallback(() => {
    const now = Date.now()
    const lastChange = parseInt(state.lastQuoteChange)
    const shouldUpdate =
      state.quoteFrequency === 'everyTab' ||
      (state.quoteFrequency === 'everyHour' && now - lastChange > 3600000) ||
      (state.quoteFrequency === 'everyDay' && now - lastChange > 86400000)

    if (state.quoteFrequency !== 'pause' && shouldUpdate) {
      generateNewQuote()
    }
  }, [state.quoteFrequency, state.lastQuoteChange, generateNewQuote])

  useEffect(() => {
    checkAndUpdateBackground()
  }, [checkAndUpdateBackground])

  useEffect(() => {
    checkAndUpdateQuote()
  }, [checkAndUpdateQuote])

  useEffect(() => {
    const fetchBackgroundImage = () => {
      const newImageUrl =
        state.bgSource === 'picsum'
          ? `https://picsum.photos/seed/${state.imageSeed}/1920/1280?blur=${state.blur}`
          : state.customImageUrl || fallbackImage
      updateState({ imageUrl: newImageUrl })
    }

    fetchBackgroundImage()
  }, [
    state.blur,
    state.bgSource,
    state.customImageUrl,
    state.imageSeed,
    updateState
  ])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && state.isSettingsOpen) {
        updateState({ isSettingsOpen: false })
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [state.isSettingsOpen, updateState])

  useEffect(() => {
    Object.entries(state).forEach(([key, value]) => {
      if (typeof value !== 'object' && key !== 'imageUrl') {
        updateLocalStorage(key, value.toString())
      }
    })
    Object.entries(state.settings).forEach(([key, value]) => {
      updateLocalStorage(key, JSON.stringify(value))
    })
  }, [state, updateLocalStorage])

  const updateGreeting = useCallback(() => {
    const newGreeting = getGreeting(getCurrentDate())
    if (newGreeting !== state.greeting) {
      updateState({ greeting: newGreeting })
    }
  }, [state.greeting, updateState])

  useEffect(() => {
    const timer = setInterval(updateGreeting, 3600000) // Every hour
    return () => clearInterval(timer)
  }, [updateGreeting])

  const settingsModalProps = useMemo(
    () => ({
      isOpen: state.isSettingsOpen,
      onClose: () => updateState({ isSettingsOpen: false }),
      blur: state.blur,
      setBlur: (blur: number) => updateState({ blur }),
      brightness: state.brightness,
      setBrightness: (brightness: number) => updateState({ brightness }),
      greetingName: state.greetingName,
      setGreetingName: (name: string) => updateState({ greetingName: name }),
      settings: state.settings,
      toggleSetting: (settingName: keyof SettingsType) => {
        const newSettings = {
          ...state.settings,
          [settingName]: !state.settings[settingName]
        }
        updateState({ settings: newSettings })
      },
      bgSource: state.bgSource,
      setBgSource: (source: BgSource) => updateState({ bgSource: source }),
      setCustomImageUrl: (url: string) => updateState({ customImageUrl: url }),
      bgFrequency: state.bgFrequency,
      setImageSeed: generateNewImageSeed,
      setBgFrequency: (frequency: Frequency) => {
        updateState({ bgFrequency: frequency })
        setTimeout(checkAndUpdateBackground, 0)
      },
      quoteFrequency: state.quoteFrequency,
      setQuoteFrequency: (frequency: Frequency) => {
        updateState({ quoteFrequency: frequency })
        setTimeout(checkAndUpdateQuote, 0)
      },
      refreshQuote: generateNewQuote,
      selectedEngine: state.selectedEngine,
      setSelectedEngine: (engine: SearchEngine) =>
        updateState({ selectedEngine: engine })
    }),
    [
      state,
      updateState,
      generateNewImageSeed,
      checkAndUpdateBackground,
      checkAndUpdateQuote,
      generateNewQuote
    ]
  )

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500 ease-in-out"
        style={{
          backgroundImage: `url(${state.imageUrl})`,
          filter: `brightness(${state.brightness}%)`
        }}
      />
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="flex flex-col items-center">
          <Time />
          {state.settings.showGreeting && (
            <h2 className="mx-8 mt-8 text-center text-3xl font-normal capitalize text-white drop-shadow-xl sm:mx-8">
              {state.greeting}, {state.greetingName}
            </h2>
          )}
          {state.settings.showQuote && <Quote />}
          {state.settings.showWeather && <Weather />}
          {state.settings.showSearch && (
            <Search
              onSearch={(query) => updateState({ searchQuery: query })}
              selectedEngine={state.selectedEngine}
            />
          )}
          <Settings
            onToggle={() =>
              updateState({ isSettingsOpen: !state.isSettingsOpen })
            }
            isModalOpen={state.isSettingsOpen}
          />
        </div>
      </div>
      <SettingsModal {...settingsModalProps} />
    </div>
  )
}

export default App
