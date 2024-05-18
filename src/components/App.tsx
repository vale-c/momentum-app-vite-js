import { useState, useEffect } from 'react'
import { Quote } from './Quote'
import { Time } from './Time'
import { coolNames, greeting } from '../utils'
import { Settings } from './Settings'
import { SettingsModal } from './Settings/SettingsModal'
import { Weather } from './Weather'

type BgDimensions = {
  width: number
  height: number
}

const App = () => {
  const [dimensions, setDimensions] = useState<BgDimensions>({
    width: 0,
    height: 0
  })
  const [imageSeed, setImageSeed] = useState('random-image-seed')
  const [blur, setBlur] = useState(10)
  const [coolName, setCoolName] = useState(
    () => localStorage.getItem('greetingName') || coolNames[0]
  )

  const getCoolName = () => {
    setCoolName(coolNames[Math.floor(Math.random() * coolNames.length)])
  }

  const [showGreeting, setShowGreeting] = useState(true)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const toggleSettings = () => setIsSettingsOpen((prev) => !prev)
  const closeSettings = () => setIsSettingsOpen(false)

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeSettings()
    }
  }

  useEffect(() => {
    const handleResize = () => {
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

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (isSettingsOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => document.removeEventListener('keydown', handleKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSettingsOpen])

  useEffect(() => {
    localStorage.setItem('greetingName', coolName)
  }, [coolName])

  const imageUrl = `https://picsum.photos/seed/${imageSeed}/${dimensions.width}/${dimensions.height}?blur=${blur}`

  return (
    <div
      className="h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${imageUrl})` }}
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
            setBlur={setBlur}
            fetchNewGreeting={() => {
              getCoolName()
            }}
            greetingName={coolName}
            setGreetingName={setCoolName}
            showGreeting={showGreeting}
            setShowGreeting={setShowGreeting}
          />
        </div>
      </div>
    </div>
  )
}

export default App
