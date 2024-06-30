import { useState, useEffect } from 'react'
import { Quote } from './Quote'
import { Time } from './Time'
import { Settings } from './Settings'
import { SettingsModal } from './Settings/SettingsModal'
import { Weather } from './Weather'

import {
  coolNames,
  getGreeting,
  getCurrentDate,
  determineCollectionId,
  getUnsplashImageUrl
} from '../utils'

type BgDimensions = { width: number; height: number }

const App = () => {
  const [dimensions, setDimensions] = useState<BgDimensions>({
    width: window.innerWidth,
    height: window.innerHeight
  })
  const [imageSeed, setImageSeed] = useState(
    () => localStorage.getItem('imageSeed') || Math.random().toString()
  )
  const [bgSource, setBgSource] = useState(
    () => localStorage.getItem('bgSource') || 'picsum'
  )
  const [imageUrl, setImageUrl] = useState('')
  const [coolName, setCoolName] = useState(
    () => localStorage.getItem('greetingName') || coolNames[0]
  )
  const [blur, setBlur] = useState(() => {
    const savedBlur = localStorage.getItem('blur')
    return savedBlur ? parseInt(savedBlur, 10) : 5 // Default to 10 if nothing is stored
  })

  const getCoolName = () => {
    setCoolName(coolNames[Math.floor(Math.random() * coolNames.length)])
  }
  const [showGreeting, setShowGreeting] = useState(true)
  const [greeting, setGreeting] = useState(() => getGreeting(getCurrentDate()))
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const updateGreeting = () => {
    const newGreeting = getGreeting(getCurrentDate())
    if (newGreeting !== greeting) setGreeting(newGreeting)
  }

  useEffect(() => {
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  const fetchBackgroundImage = () => {
    if (bgSource === 'picsum') {
      // Picsum supports blur directly in the URL.
      const picsumUrl = `https://picsum.photos/seed/${imageSeed}/${dimensions.width}/${dimensions.height}?blur=${blur}`
      setImageUrl(picsumUrl)
    } else {
      const collectionId = determineCollectionId()
      getUnsplashImageUrl(collectionId).then(setImageUrl)
    }
  }

  const updateDimensions = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    const windowAspectRatio = width / height
    const imageAspectRatio = 16 / 9
    const newDimensions =
      windowAspectRatio > imageAspectRatio
        ? { width, height: Math.round(width / imageAspectRatio) }
        : { width: Math.round(height * imageAspectRatio), height }
    setDimensions(newDimensions)
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSettingsOpen])

  useEffect(() => {
    localStorage.setItem('greetingName', coolName)
    localStorage.setItem('bgSource', bgSource)
    localStorage.setItem('imageSeed', imageSeed)
    localStorage.setItem('blur', blur.toString())
    fetchBackgroundImage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blur, coolName, bgSource, imageSeed])

  useEffect(() => {
    const timer = setInterval(() => updateGreeting(), 3600000) // Every hour
    return () => clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [greeting])

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && isSettingsOpen) {
      closeSettings()
    }
  }

  const closeSettings = () => setIsSettingsOpen(false)
  const toggleSettings = () => setIsSettingsOpen((prev) => !prev)

  return (
    <div
      className="h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${imageUrl})`
      }}
    >
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center">
          <Time />
          {showGreeting && (
            <h2 className="mx-8 mt-8 text-center text-3xl font-normal capitalize text-white drop-shadow-xl sm:mx-8">
              {greeting}, {coolName}
            </h2>
          )}
          <Quote />
          <Weather />
          <Settings onToggle={toggleSettings} isModalOpen={isSettingsOpen} />
          <SettingsModal
            isOpen={isSettingsOpen}
            onClose={closeSettings}
            setImageSeed={setImageSeed}
            blur={blur}
            setBlur={setBlur}
            fetchNewGreeting={getCoolName}
            greetingName={coolName}
            setGreetingName={setCoolName}
            showGreeting={showGreeting}
            setShowGreeting={setShowGreeting}
            bgSource={bgSource}
            setBgSource={setBgSource}
          />
        </div>
      </div>
    </div>
  )
}

export default App
