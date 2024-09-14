import { useRef } from 'react'
import { ToggleComponent } from 'components/Ui/Toggle'
import { resizeImage } from '../../../utils'
import { FaSync } from 'react-icons/fa'

export type Settings = {
  showGreeting: boolean
  showQuote: boolean
  showWeather: boolean
  showSearch: boolean
}

export type BgSource = 'picsum' | 'custom'

export type SearchEngine = {
  name: string
  url: string
}

export const searchEngines: SearchEngine[] = [
  { name: 'Google', url: 'https://www.google.com/search?q=' },
  { name: 'Bing', url: 'https://www.bing.com/search?q=' },
  { name: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=' },
  { name: 'Yahoo', url: 'https://search.yahoo.com/search?p=' }
]

export type Frequency = 'everyTab' | 'everyHour' | 'everyDay' | 'pause'

type SettingsModalProps = {
  isOpen: boolean
  onClose: () => void
  blur: number
  setBlur: (blur: number) => void
  brightness: number
  setBrightness: (brightness: number) => void
  greetingName: string
  setGreetingName: (name: string) => void
  settings: Settings
  toggleSetting: (settingName: keyof Settings) => void
  setCustomImageUrl: (url: string) => void
  selectedEngine: SearchEngine
  setSelectedEngine: (engine: SearchEngine) => void
  bgSource: BgSource
  setImageSeed: () => void
  setBgSource: (source: BgSource) => void
  bgFrequency: Frequency
  setBgFrequency: (frequency: Frequency) => void
  quoteFrequency: Frequency
  setQuoteFrequency: (frequency: Frequency) => void
  refreshQuote: () => void
}

const FrequencySelect: React.FC<{
  value: Frequency
  onChange: (value: Frequency) => void
  onRefresh?: () => void
}> = ({ value, onChange, onRefresh }) => (
  <div className="flex items-center justify-between">
    <label className="text-sm font-medium text-gray-300">Frequency</label>
    <div className="flex items-center space-x-2">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as Frequency)}
        className="grow rounded-lg bg-gray-700 px-3 py-2 text-white"
      >
        <option value="everyTab">Every Tab</option>
        <option value="everyHour">Every Hour</option>
        <option value="everyDay">Every Day</option>
        <option value="pause">Pause</option>
      </select>
      <button
        onClick={onRefresh}
        className="rounded-full bg-blue-500 p-2 text-white transition-colors duration-200 hover:bg-blue-600"
      >
        <FaSync size={16} />
      </button>
    </div>
  </div>
)

export const SettingsModal = ({
  isOpen,
  onClose,
  setImageSeed,
  blur,
  setBlur,
  brightness,
  setBrightness,
  greetingName,
  setGreetingName,
  settings,
  toggleSetting,
  bgSource,
  setBgSource,
  setCustomImageUrl,
  selectedEngine,
  setSelectedEngine,
  bgFrequency,
  setBgFrequency,
  quoteFrequency,
  setQuoteFrequency,
  refreshQuote
}: SettingsModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)

  const handleCloseClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose()
    }
  }

  const handleBlurChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newBlur = parseInt(event.target.value, 10)
    setBlur(newBlur)
  }

  const handleBrightnessChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newBrightness = parseInt(event.target.value, 10)
    setBrightness(newBrightness)
  }

  const handleBgSourceChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setBgSource(event.target.value as BgSource)
  }

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event?.target?.files ? event?.target?.files[0] : null
    if (file) {
      try {
        const resizedImageUrl = await resizeImage(file)
        setCustomImageUrl(resizedImageUrl)
      } catch (error) {
        console.error('Error resizing image:', error)
      }
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/20"
      onClick={handleCloseClick}
    >
      <div
        ref={modalRef}
        className="h-full w-96 overflow-y-auto bg-gray-900 p-4 text-white"
      >
        <h2 className="mb-2 ml-3 border-gray-700 text-sm font-medium uppercase tracking-widest text-gray-400">
          Background
        </h2>
        <div className="space-y-2 rounded-lg bg-gray-800 p-4">
          <div className="flex items-center justify-between">
            <label
              htmlFor="background-source"
              className="text-sm text-gray-300"
            >
              Background Source:
            </label>
            <select
              id="background-source"
              value={bgSource}
              onChange={(e) => handleBgSourceChange(e)}
              className="cursor-pointer rounded-lg bg-gray-700 p-2 text-white"
            >
              <option value="picsum">Picsum</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          <hr className="border-gray-700" />
          <div className="relative">
            <div className="items-center justify-between">
              <FrequencySelect
                value={bgFrequency}
                onChange={setBgFrequency}
                onRefresh={setImageSeed}
              />
            </div>
          </div>
          <hr className="border-gray-700" />
          {bgSource === 'custom' && (
            <div className="flex flex-col">
              <label
                htmlFor="file-upload"
                className="mb-2 text-sm text-gray-300"
              >
                Upload Custom Image:
              </label>
              <input
                type="file"
                id="file-upload"
                accept="image/*"
                onChange={handleFileUpload}
                className="cursor-pointer rounded-lg bg-gray-700 text-gray-300"
              />
            </div>
          )}
          {bgSource === 'picsum' && (
            <>
              <div className="flex items-center gap-4">
                <label htmlFor="blur-slider" className="mb-2 block text-sm">
                  Blur Intensity
                </label>
                <input
                  id="blur-slider"
                  type="range"
                  min="1"
                  max="10"
                  value={blur}
                  onChange={handleBlurChange}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-300 dark:bg-gray-700"
                />
              </div>
              <hr className="border-gray-700" />
              <div className="flex items-center gap-4">
                <label
                  htmlFor="brightness-slider"
                  className="mb-2 block text-sm"
                >
                  Brightness
                </label>
                <input
                  id="brightness-slider"
                  type="range"
                  min="50"
                  max="150"
                  step="10"
                  value={brightness}
                  onChange={handleBrightnessChange}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-300 dark:bg-gray-700"
                />
              </div>
            </>
          )}
        </div>
        <h2 className="ml-3 mt-4 border-gray-700 pb-2 text-sm font-medium uppercase tracking-widest text-gray-400">
          Greeting
        </h2>
        <div className="space-y-4 rounded-lg bg-gray-800 p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-300">
              Show Greeting
            </span>
            <ToggleComponent
              isActive={settings.showGreeting}
              setIsActive={() => toggleSetting('showGreeting')}
            />
          </div>
          <hr className="border-gray-700" />
          <div className="flex items-center justify-between">
            <label htmlFor="greeting-name" className="w-full text-sm">
              Greeting Name
            </label>
            <input
              id="greeting-name"
              type="text"
              value={greetingName}
              onChange={(e) => setGreetingName(e.target.value)}
              className="h-8 w-full rounded-lg bg-gray-700 px-3 text-gray-300"
            />
          </div>
        </div>
        <h2 className="ml-3 mt-4 border-gray-700 pb-2 text-sm font-medium uppercase tracking-widest text-gray-400">
          Quote
        </h2>
        <div className="space-y-2 rounded-lg bg-gray-800 p-3">
          <div className="relative">
            <div className="items-center justify-between">
              <FrequencySelect
                value={quoteFrequency}
                onChange={setQuoteFrequency}
                onRefresh={refreshQuote}
              />
            </div>
          </div>
          <hr className="border-gray-700" />
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-300">
              Show Quote
            </span>
            <ToggleComponent
              isActive={settings.showQuote}
              setIsActive={() => toggleSetting('showQuote')}
            />
          </div>
        </div>
        <h2 className="ml-3 mt-4 border-gray-700 pb-2 text-sm font-medium uppercase tracking-widest text-gray-400">
          Weather
        </h2>
        <div className="space-y-4 rounded-lg bg-gray-800 p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-300">
              Show Weather
            </span>
            <ToggleComponent
              isActive={settings.showWeather}
              setIsActive={() => toggleSetting('showWeather')}
            />
          </div>
        </div>
        <h2 className="ml-3 mt-4 border-gray-700 pb-2 text-sm font-medium uppercase tracking-widest text-gray-400">
          Search
        </h2>
        <div className="space-y-4 rounded-lg bg-gray-800 p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-300">
              Show Search
            </span>
            <ToggleComponent
              isActive={settings.showSearch}
              setIsActive={() => toggleSetting('showSearch')}
            />
          </div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="search-engine"
              className="text-sm font-medium text-gray-300"
            >
              Search Engine
            </label>
            <select
              id="search-engine"
              value={selectedEngine.name}
              onChange={(e) =>
                setSelectedEngine(
                  searchEngines.find(
                    (engine) => engine.name === e.target.value
                  ) || searchEngines[0]
                )
              }
              className="rounded-lg bg-gray-700 p-2 text-white"
            >
              {searchEngines.map((engine) => (
                <option
                  key={engine.name}
                  value={engine.name}
                  className="bg-gray-700"
                >
                  {engine.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
