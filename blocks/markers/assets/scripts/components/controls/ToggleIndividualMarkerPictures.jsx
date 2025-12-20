import { ToggleControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

export default function ToggleIndividualMarkerPictures({ defaultValue, setAttributes }) {
	const handleChange = (value) => {
		setAttributes({ useIndividualMarkerPictures: value })
	}

	const helpText = defaultValue ? __('Each marker will use its individual picture', 'mappps') : __('All markers will use the general marker settings', 'mappps')

	return <ToggleControl checked={defaultValue} help={helpText} label={__('Individual marker pictures', 'mappps')} onChange={handleChange} />
}
