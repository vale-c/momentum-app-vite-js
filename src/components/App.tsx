import { useState, useEffect } from 'react'
import { Quote } from './Quote'
import { Time } from './Time'
import { Search } from './Search'
import { Settings } from './Settings'
import { SettingsModal } from './Settings/SettingsModal'
import { Weather } from './Weather'
import fallbackImage from '../assets/sf-bg.avif'
import { coolNames, getGreeting, getCurrentDate } from '../utils'

type Settings = {
  showGreeting: boolean
  showQuote: boolean
  showWeather: boolean
  showSearch: boolean
}

type AppState = {
  dimensions: { width: number; height: number }
  imageSeed: string
  bgSource: string
  customImageUrl: string
  imageUrl: string
  coolName: string
  blur: number
  brightness: number
  greeting: string
  isSettingsOpen: boolean
  settings: Settings
  searchQuery: string
}

const App = () => {
  const [state, setState] = useState<AppState>({
    dimensions: { width: window.innerWidth, height: window.innerHeight },
    imageSeed: localStorage.getItem('imageSeed') || Math.random().toString(),
    bgSource: localStorage.getItem('bgSource') || 'picsum',
    customImageUrl: localStorage.getItem('customImageUrl') || '',
    imageUrl: fallbackImage,
    coolName: localStorage.getItem('greetingName') || coolNames[0],
    blur: parseInt(localStorage.getItem('blur') || '5'),
    brightness: parseInt(localStorage.getItem('brightness') || '100'),
    greeting: getGreeting(getCurrentDate()),
    isSettingsOpen: false,
    settings: {
      showGreeting: JSON.parse(localStorage.getItem('showGreeting') || 'true'),
      showQuote: JSON.parse(localStorage.getItem('showQuote') || 'true'),
      showWeather: JSON.parse(localStorage.getItem('showWeather') || 'true'),
      showSearch: JSON.parse(localStorage.getItem('showSearch') || 'false') // New setting
    },
    searchQuery: ''
  })

  const getCoolName = () => {
    setState((prevState) => ({
      ...prevState,
      coolName: coolNames[Math.floor(Math.random() * coolNames.length)]
    }))
  }

  const updateGreeting = () => {
    const newGreeting = getGreeting(getCurrentDate())
    if (newGreeting !== state.greeting) {
      setState((prevState) => ({ ...prevState, greeting: newGreeting }))
    }
  }

  const toggleSetting = (settingName: keyof Settings) => {
    setState((prevState) => {
      const newValue = !prevState.settings[settingName]
      localStorage.setItem(settingName, JSON.stringify(newValue))
      return {
        ...prevState,
        settings: {
          ...prevState.settings,
          [settingName]: newValue
        }
      }
    })
  }

  const updateImageSeed = (newSeed: string) => {
    localStorage.setItem('imageSeed', newSeed)
    setState((prevState) => ({
      ...prevState,
      imageSeed: newSeed
    }))
  }

  const handleSearch = (query: string) => {
    setState((prevState) => ({ ...prevState, searchQuery: query }))
  }

  useEffect(() => {
    const fetchBackgroundImage = () => {
      switch (state.bgSource) {
        case 'picsum':
          setState((prevState) => ({
            ...prevState,
            imageUrl: `https://picsum.photos/seed/${state.imageSeed}/1920/1280?blur=${state.blur}`
          }))
          break
        case 'custom':
          setState((prevState) => ({
            ...prevState,
            imageUrl: state.customImageUrl || fallbackImage
          }))
          break
        default:
          setState((prevState) => ({ ...prevState, imageUrl: fallbackImage }))
      }
    }

    fetchBackgroundImage()
  }, [
    state.blur,
    state.brightness,
    state.bgSource,
    state.customImageUrl,
    state.imageSeed,
    state.dimensions
  ])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && state.isSettingsOpen) {
        closeSettings()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [state.isSettingsOpen])

  useEffect(() => {
    localStorage.setItem('greetingName', state.coolName)
    localStorage.setItem('bgSource', state.bgSource)
    localStorage.setItem('imageSeed', state.imageSeed)
    localStorage.setItem('blur', state.blur.toString())
    localStorage.setItem('brightness', state.brightness.toString())
    localStorage.setItem('customImageUrl', state.customImageUrl)
    localStorage.setItem(
      'showGreeting',
      JSON.stringify(state.settings.showGreeting)
    )
    localStorage.setItem('showQuote', JSON.stringify(state.settings.showQuote))
    localStorage.setItem(
      'showWeather',
      JSON.stringify(state.settings.showWeather)
    )
    localStorage.setItem(
      'showSearch',
      JSON.stringify(state.settings.showSearch)
    )
  }, [state])

  useEffect(() => {
    const timer = setInterval(() => updateGreeting(), 3600000) // Every hour
    return () => clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.greeting])

  const closeSettings = () =>
    setState((prevState) => ({ ...prevState, isSettingsOpen: false }))
  const toggleSettings = () =>
    setState((prevState) => ({
      ...prevState,
      isSettingsOpen: !prevState.isSettingsOpen
    }))

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
              {state.greeting}, {state.coolName}
            </h2>
          )}
          {state.settings.showQuote && <Quote />}
          {state.settings.showWeather && <Weather />}
          {state.settings.showSearch && <Search onSearch={handleSearch} />}
          <Settings
            onToggle={toggleSettings}
            isModalOpen={state.isSettingsOpen}
          />
        </div>
      </div>
      <SettingsModal
        isOpen={state.isSettingsOpen}
        onClose={closeSettings}
        setImageSeed={updateImageSeed}
        blur={state.blur}
        setBlur={(blur) => setState((prevState) => ({ ...prevState, blur }))}
        brightness={state.brightness}
        setBrightness={(brightness) =>
          setState((prevState) => ({ ...prevState, brightness }))
        }
        fetchNewGreeting={getCoolName}
        greetingName={state.coolName}
        setGreetingName={(name) =>
          setState((prevState) => ({ ...prevState, coolName: name }))
        }
        settings={state.settings}
        toggleSetting={toggleSetting}
        bgSource={state.bgSource}
        setBgSource={(source) =>
          setState((prevState) => ({ ...prevState, bgSource: source }))
        }
        setCustomImageUrl={(url) =>
          setState((prevState) => ({ ...prevState, customImageUrl: url }))
        }
      />
    </div>
  )
}

export default App
