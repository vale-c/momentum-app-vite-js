type RefreshGreetingProps = {
  fetchNewGreeting: () => void
}

export const RefreshGreetingButton = ({
  fetchNewGreeting
}: RefreshGreetingProps) => {
  return (
    <div className="flex items-center gap-4">
      <p className="text-sm text-white">Random Greeting Name</p>
      <button
        className="rounded-lg px-4 py-2 text-white transition-colors hover:bg-blue-600"
        onClick={fetchNewGreeting}
      >
        🔄️
      </button>
    </div>
  )
}
