import './styles/index.scss'

import domReady from '@wordpress/dom-ready'
import { createRoot } from '@wordpress/element'

import MediaSelector from './scripts/components/media-selector'
import SettingsPage from './scripts/SettingsPage'

domReady(() => {
	const args = window.mappps_admin_args
	if (!args) {
		return
	}

	if (args.supports_custom_fields) {
		// Initialize media selectors and watch for new fields
		MediaSelector.init(['mappps_marker'], {
			previewSize: '100px',
			mediaTypes: ['image'],
			allowMultiple: false
		})
	}

	// Render the settings page
	if (args.is_admin_page) {
		const rootElement = document.getElementById('mppps_page-root')
		if (rootElement) {
			const root = createRoot(rootElement)
			root.render(<SettingsPage />)
		}
	}
})
