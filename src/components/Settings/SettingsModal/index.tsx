import { useRef, useState } from 'react'
import { RefreshBgButton } from '../RefreshBgButton'
import { RefreshQuoteButton } from '../RefreshQuoteButton'
import { useQuote } from '../../Quote/context'
import { RefreshGreetingButton } from '../RefreshGreetingButton'
import { ToggleComponent } from 'components/Ui/Toggle'

type SettingsModalProps = {
  isOpen: boolean
  onClose: () => void
  setImageSeed: (seed: string) => void
  setBlur: (blur: number) => void
  fetchNewGreeting: () => void
  greetingName: string
  setGreetingName: (name: string) => void
  showGreeting: boolean
  setShowGreeting: (show: boolean) => void
}

export const SettingsModal = ({
  isOpen,
  onClose,
  setImageSeed,
  setBlur,
  fetchNewGreeting,
  greetingName,
  setGreetingName,
  showGreeting,
  setShowGreeting
}: SettingsModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const { fetchQuote } = useQuote()

  const handleCloseClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose()
    }
  }

  const [blurLevel, setBlurLevel] = useState(5)

  const handleBlurChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newBlur = parseInt(event.target.value, 10)
    setBlurLevel(newBlur)
    setBlur(newBlur)
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 flex justify-end bg-black/20"
      onClick={handleCloseClick}
    >
      <div
        ref={modalRef}
        className="h-full w-96 overflow-y-auto bg-gray-900 p-4 text-white"
      >
        <h2 className="my-4 ml-4 border-gray-700 pb-2 text-sm font-medium uppercase tracking-widest text-gray-400">
          Background
        </h2>
        <div className="space-y-4 rounded-lg bg-gray-800 p-3">
          <RefreshBgButton setImageSeed={setImageSeed} />
          <hr className="border-gray-700" />
          <div className="flex items-center gap-4">
            <label htmlFor="blur-slider" className="mb-2 block text-sm">
              Blur Intensity
            </label>
            <input
              id="blur-slider"
              type="range"
              min="1"
              max="10"
              value={blurLevel}
              onChange={handleBlurChange}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-300 dark:bg-gray-700"
            />
          </div>
        </div>
        <h2 className="ml-4 mt-6 border-gray-700 pb-2 text-sm font-medium uppercase tracking-widest text-gray-400">
          Greeting
        </h2>
        <div className="space-y-4 rounded-lg bg-gray-800 p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-300">
              Show Greeting
            </span>
            <ToggleComponent
              isActive={showGreeting}
              setIsActive={setShowGreeting}
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
              className="h-8 w-full rounded-lg bg-gray-800 px-3 text-gray-300"
            />
          </div>
          <hr className="border-gray-700" />
          <div className="rounded-lg bg-gray-800">
            <RefreshGreetingButton fetchNewGreeting={fetchNewGreeting} />
          </div>
        </div>
        <h2 className="ml-4 mt-6 border-gray-700 pb-2 text-sm font-medium uppercase tracking-widest text-gray-400">
          Quote
        </h2>
        <div className="space-y-4 rounded-lg bg-gray-800 p-3">
          <RefreshQuoteButton fetchNewQuote={fetchQuote} />
        </div>
      </div>
    </div>
  )
}
