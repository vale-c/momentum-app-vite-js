import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'
import App from 'components/App'
import { QuoteProvider } from 'components/Quote/context'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <QuoteProvider>
    <App />
  </QuoteProvider>
)
