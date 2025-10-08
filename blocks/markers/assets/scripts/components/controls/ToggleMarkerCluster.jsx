import { ToggleControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

export default function ToggleMarkerCluster({ defaultValue, setAttributes }) {
	const handleChange = (value) => {
		setAttributes({ isClustered: value })
	}

	const helpText = defaultValue ? __('Markers will be clustered', 'mappps') : __('Markers will not be clustered', 'mappps')

	return <ToggleControl checked={defaultValue} help={helpText} label={__('Marker clustering', 'mappps')} onChange={handleChange} />
}
