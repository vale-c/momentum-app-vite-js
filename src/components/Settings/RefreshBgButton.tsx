type RefreshBgButtonProps = {
  setImageSeed: (seed: string) => void
}

export const RefreshBgButton = ({ setImageSeed }: RefreshBgButtonProps) => {
  const refreshBg = () => {
    setImageSeed(Date.now().toString())
  }
  return (
    <button
      className="rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-700"
      onClick={refreshBg}
    >
      Refresh Background 🔄🖼️
    </button>
  )
}
