import { useRef } from 'react'
import { RefreshBgButton } from '../RefreshBgButton'

type SettingsModalProps = {
  isOpen: boolean
  onClose: () => void
  setImageSeed: (seed: string) => void
}

export const SettingsModal = ({
  isOpen,
  onClose,
  setImageSeed
}: SettingsModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)

  const handleCloseClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 flex justify-end bg-black/80"
      onClick={handleCloseClick}
    >
      <div
        ref={modalRef}
        className="h-full w-96 overflow-y-auto bg-gray-900 p-4 text-white"
      >
        <h2 className="mb-4 border-b border-gray-700 pb-2 text-lg font-bold">
          General
        </h2>
        <div className="space-y-4">
          <RefreshBgButton setImageSeed={setImageSeed} />
        </div>
      </div>
    </div>
  )
}
