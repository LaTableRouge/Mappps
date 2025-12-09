import { ToggleControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

export default function ToggleOpenInNewTab({ defaultValue, setAttributes }) {
	return (
		<ToggleControl
			checked={defaultValue}
			help={defaultValue ? __('The "Open in new tab" button will be displayed', 'mappps') : ''}
			label={__('Display "Open in new tab" button?', 'mappps')}
			onChange={(value) => {
				setAttributes({ showOpenInNewTab: value })
			}}
		/>
	)
}
