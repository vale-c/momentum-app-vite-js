import pica from 'pica'

export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(' ')
}

export const coolNames = [
  'Sparkle Ninja',
  'Neon Whisper',
  'Cosmic Explorer',
  'Pixel Pirate',
  'Galactic Jester',
  'Laser Unicorn',
  'Quantum Dreamer',
  'Cyber Samurai',
  'Space Cowboy',
  'Techno Wizard',
  'Funky Monkey',
  'Disco Dancer',
  'Mystic Mermaid',
  'Retro Rockstar',
  'Electric Eel',
  'Groovy Guru',
  'Virtual Voyager',
  'Fantasy Phoenix',
  'Rainbow Rider',
  'Mindful Magician'
]

export function getCurrentDate(): Date {
  return new Date()
}

export function formatDateTime(date: Date) {
  return {
    hours: date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    }),
    dayOfWeek: date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    })
  }
}

export function getGreeting(date: Date): string {
  const hour = date.getHours()
  if (hour < 12) {
    return 'Good morning'
  } else if (hour < 18) {
    return 'Good afternoon'
  } else {
    return 'Good evening'
  }
}

export const resizeImage = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject('Unable to get canvas context')
          return
        }

        const maxWidth = 1920
        const maxHeight = 1280
        const imgRatio = img.width / img.height
        const desiredRatio = maxWidth / maxHeight

        let targetWidth = maxWidth
        let targetHeight = maxHeight

        if (imgRatio > desiredRatio) {
          // Image is wider than desired aspect ratio
          targetHeight = maxWidth / imgRatio
        } else if (imgRatio < desiredRatio) {
          // Image is taller than desired aspect ratio
          targetWidth = maxHeight * imgRatio
        }

        canvas.width = targetWidth
        canvas.height = targetHeight

        pica()
          .resize(img, canvas, {
            unsharpAmount: 80,
            unsharpRadius: 0.6,
            unsharpThreshold: 2
          })
          .then((result: HTMLCanvasElement) =>
            result.toDataURL('image/jpeg', 0.9)
          )
          .then((base64: string) => {
            resolve(base64)
          })
          .catch(reject)
      }
      img.src = event.target!.result as string
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
