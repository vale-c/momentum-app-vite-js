type RefreshQuoteButtonProps = {
  fetchNewQuote: () => void
}

export const RefreshQuoteButton = ({
  fetchNewQuote
}: RefreshQuoteButtonProps) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <p className="text-sm text-white">Refresh</p>
      <button
        className="rounded-lg px-2 py-1 text-white transition-colors hover:bg-blue-600"
        onClick={fetchNewQuote}
      >
        🔄️
      </button>
    </div>
  )
}
