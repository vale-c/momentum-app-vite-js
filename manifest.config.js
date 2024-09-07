import fs from 'fs'

const manifestOverrides = () => ({
  content_security_policy: {
    extension_pages: `script-src 'self' 'wasm-unsafe-eval'; object-src 'self'; connect-src https://en.wikipedia.org/ https://api.open-meteo.com/ https://stoic-quotes.com/api/quote http://localhost:* ws://localhost:*`
  },
  web_accessible_resources: [
    {
      resources: ['index.html'],
      matches: ['<all_urls>']
    }
  ]
})

export default (env) => {
  const manifest = JSON.parse(fs.readFileSync('./manifest.json', 'utf-8'))

  if (env.MODE === 'development') {
    const overrides = manifestOverrides(env)
    return { ...manifest, ...overrides }
  }

  return manifest
}
