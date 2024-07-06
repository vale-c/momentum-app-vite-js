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
      className="rounded-lg px-4 py-1 text-white transition-colors hover:bg-blue-600"
    >
      ️🔁
    </button>
  )
}
