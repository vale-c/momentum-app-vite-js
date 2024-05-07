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

const currentDate = new Date()

// Function to format the date and time
function formatDateTime(date: Date) {
  return {
    hours: date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    }),
    dayOfWeek: date.toLocaleDateString('en-US', {
      weekday: 'long', // Abbreviated day, e.g., "Tue"
      month: 'short', // Abbreviated month, e.g., "May"
      day: 'numeric' // Day of the month
    })
  }
}

// Greeting based on the current hour
function getGreeting(date: Date): string {
  const hour = date.getHours()
  if (hour < 12) {
    return 'Good morning'
  } else if (hour < 18) {
    return 'Good afternoon'
  } else {
    return 'Good evening'
  }
}

export const greeting = getGreeting(currentDate)

export const { hours, dayOfWeek } = formatDateTime(currentDate)
