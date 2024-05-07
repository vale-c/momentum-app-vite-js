export const Settings = ({
  onToggle,
  isModalOpen
}: {
  onToggle: () => void
  isModalOpen: boolean
}) => {
  const bgClass = isModalOpen ? 'bg-gray-700 rounded-lg' : ''

  return (
    <div className={`absolute bottom-4 right-4 z-10 p-2 ${bgClass}`}>
      <img
        src="src/assets/gear.svg"
        alt="Settings"
        className="size-6 cursor-pointer  transition-transform hover:rotate-45 hover:duration-300 hover:ease-in-out"
        onClick={onToggle}
      />
    </div>
  )
}
