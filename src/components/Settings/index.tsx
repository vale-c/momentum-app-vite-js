import { FiSettings } from 'react-icons/fi'

export const Settings = ({
  onToggle,
  isModalOpen
}: {
  onToggle: () => void
  isModalOpen: boolean
}) => {
  return (
    <div className="absolute bottom-6 right-6 z-10">
      <button
        onClick={onToggle}
        className={`flex size-12 items-center justify-center rounded-full bg-black/30 text-white shadow-lg backdrop-blur-sm transition-all duration-500 ease-in-out hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent ${
          isModalOpen ? 'bg-black/50' : ''
        }`}
        aria-label={isModalOpen ? 'Close settings' : 'Open settings'}
        aria-expanded={isModalOpen}
      >
        <FiSettings
          className={`size-6 transition-transform duration-500 ease-in-out ${
            isModalOpen ? 'rotate-180' : 'hover:rotate-45'
          }`}
          aria-hidden="true"
        />
      </button>
    </div>
  )
}
