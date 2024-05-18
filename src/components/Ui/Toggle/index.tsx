type ToggleComponentProps = {
  isActive: boolean
  setIsActive: (active: boolean) => void
}

export const ToggleComponent = ({
  isActive,
  setIsActive
}: ToggleComponentProps) => {
  const handleToggle = () => {
    setIsActive(!isActive)
  }

  return (
    <div className="flex items-center">
      <div className="relative inline-flex h-[24px] w-[48px] cursor-pointer items-center justify-center rounded-full">
        <input
          className="peer sr-only"
          id="toggle-greeting"
          type="checkbox"
          checked={isActive}
          onChange={handleToggle}
        />
        <label
          className="size-full rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:size-[20px] after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-500 peer-checked:after:translate-x-[24px] peer-checked:after:bg-white"
          htmlFor="toggle-greeting"
        />
      </div>
    </div>
  )
}
