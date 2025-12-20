import { ToggleControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

export default function ToggleViewItinerary({ defaultValue, setAttributes }) {
	return (
		<ToggleControl
			checked={defaultValue}
			help={defaultValue ? __('The "View itinerary" button will be displayed', 'mappps') : ''}
			label={__('Display "View itinerary" button?', 'mappps')}
			onChange={(value) => {
				setAttributes({ showViewItinerary: value })
			}}
		/>
	)
}
