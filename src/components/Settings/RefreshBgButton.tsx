type RefreshBgButtonProps = {
  setImageSeed: (seed: string) => void
}

export const RefreshBgButton = ({ setImageSeed }: RefreshBgButtonProps) => {
  const refreshImageSeed = () => {
    const newSeed = Math.random().toString()
    setImageSeed(newSeed)
  }
  return (
    <button
      onClick={refreshImageSeed}
      className="mt-2 rounded bg-gray-700 px-4 py-2 text-white transition-colors hover:bg-blue-700"
    >
      ️🔁
    </button>
  )
}
