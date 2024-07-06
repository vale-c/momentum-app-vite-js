type ToggleComponentProps = {
  isActive: boolean
  setIsActive: () => void
}

export const ToggleComponent = ({
  isActive,
  setIsActive
}: ToggleComponentProps) => {
  return (
    <label className="relative inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        checked={isActive}
        onChange={setIsActive}
        className="peer sr-only"
      />
      <div className="h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
      <span className="absolute left-2 top-1 size-4 rounded-full bg-white transition-transform peer-checked:translate-x-full"></span>
    </label>
  )
}
