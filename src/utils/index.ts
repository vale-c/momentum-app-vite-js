/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-explicit-any */

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

export const date = new Date()
export const hours = date.getHours()
export const minutes = date.getMinutes().toString().padStart(2, '0')

export const greeting = () => {
  if (hours < 12) {
    return 'Good morning'
  } else if (hours < 18) {
    return 'Good afternoon'
  } else {
    return 'Good evening'
  }
}

export const throttle = (fn: Function, wait: number = 300) => {
  let inThrottle: boolean,
    lastFn: ReturnType<typeof setTimeout>,
    lastTime: number
  return function (this: any) {
    const context = this,
      args = arguments
    if (!inThrottle) {
      fn.apply(context, args)
      lastTime = Date.now()
      inThrottle = true
    } else {
      clearTimeout(lastFn)
      lastFn = setTimeout(
        () => {
          if (Date.now() - lastTime >= wait) {
            fn.apply(context, args)
            lastTime = Date.now()
          }
        },
        Math.max(wait - (Date.now() - lastTime), 0)
      )
    }
  }
}
