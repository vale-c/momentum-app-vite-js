import { useRef, useState } from 'react'
import { RefreshBgButton } from '../RefreshBgButton'

type SettingsModalProps = {
  isOpen: boolean
  onClose: () => void
  setImageSeed: (seed: string) => void
  setBlur: (blur: number) => void // Function to set blur level
}

export const SettingsModal = ({
  isOpen,
  onClose,
  setImageSeed,
  setBlur
}: SettingsModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)

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
      </div>
    </div>
  )
}
