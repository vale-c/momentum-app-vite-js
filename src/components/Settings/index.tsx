import { FiSettings } from 'react-icons/fi'
import { useState } from 'react'

export const Settings = ({
  onToggle,
  isModalOpen
}: {
  onToggle: () => void
  isModalOpen: boolean
}) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)

  return (
    <div className="absolute bottom-6 right-6 z-10">
      <div className="relative">
        <button
          onClick={onToggle}
          onMouseEnter={() => setIsTooltipVisible(true)}
          onMouseLeave={() => setIsTooltipVisible(false)}
          onFocus={() => setIsTooltipVisible(true)}
          onBlur={() => setIsTooltipVisible(false)}
          className={`group flex size-12 items-center justify-center rounded-full bg-black/30 text-white shadow-lg backdrop-blur-sm transition-all duration-300 ease-in-out hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent ${
            isModalOpen ? 'rotate-180 bg-black/50' : ''
          }`}
          aria-label={isModalOpen ? 'Close settings' : 'Open settings'}
          aria-expanded={isModalOpen}
          aria-describedby="settings-tooltip"
        >
          <FiSettings
            className="size-6 transition-transform duration-300 ease-in-out group-hover:scale-110"
            aria-hidden="true"
          />
        </button>
        <div
          id="settings-tooltip"
          role="tooltip"
          className={`absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-black/75 px-2 py-1 text-xs text-white transition-opacity duration-300 ${
            isTooltipVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {isModalOpen ? 'Close Settings' : 'Open Settings'}
        </div>
      </div>
    </div>
  )
}
