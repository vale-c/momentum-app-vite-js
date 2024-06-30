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

export async function getUnsplashImageUrl(
  collectionId: string
): Promise<string> {
  const url = `https://api.unsplash.com/photos/random?client_id=${
    import.meta.env.VITE_UNSPLASH_ACCESS_KEY
  }&collections=${collectionId}&orientation=landscape`

  try {
    const response = await fetch(url)
    const photo = await response.json()
    return photo.urls ? photo.urls.regular : ''
  } catch (error) {
    console.error('Failed to fetch random image from Unsplash:', error)
    return ''
  }
}

export function determineCollectionId(): string {
  const hour = new Date().getHours()
  const dayCollectionId = '4933370'
  const nightCollectionId = 'VI5sx2SDQUg'
  return hour >= 6 && hour < 18 ? dayCollectionId : nightCollectionId
}
