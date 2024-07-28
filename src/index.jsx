import domReady from '@wordpress/dom-ready'
import { createRoot } from '@wordpress/element'

import SettingsPage from './scripts/SettingsPage'

domReady(() => {
  const root = createRoot(document.getElementById('mps_root'))

  root.render(<SettingsPage />)
})
