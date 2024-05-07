type RefreshBgButtonProps = {
  setImageSeed: (seed: string) => void
}

export const RefreshBgButton = ({ setImageSeed }: RefreshBgButtonProps) => {
  const refreshBg = () => {
    setImageSeed(Date.now().toString())
  }

  return (
    <div className="flex items-center gap-4">
      <p className="text-sm text-white">Refresh</p>
      <button
        className="rounded-lg px-4 py-2 text-white transition-colors hover:bg-blue-600"
        onClick={refreshBg}
      >
        🔄️
      </button>
    </div>
  )
}
