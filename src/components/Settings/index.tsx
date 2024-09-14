import { FiSettings } from 'react-icons/fi'

export const Settings = ({
  onToggle,
  isModalOpen
}: {
  onToggle: () => void
  isModalOpen: boolean
}) => {
  const bgClass = isModalOpen ? 'bg-gray-700' : 'bg-transparent'

  return (
    <div className={`absolute bottom-4 right-4 z-10 rounded-lg p-2 ${bgClass}`}>
      <button
        onClick={onToggle}
        className="p-2 text-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        aria-label={isModalOpen ? 'Close settings' : 'Open settings'}
        aria-expanded={isModalOpen}
      >
        <FiSettings
          className="size-8 transition-transform duration-300 ease-in-out hover:rotate-45"
          aria-hidden="true"
        />
      </button>
    </div>
  )
}
