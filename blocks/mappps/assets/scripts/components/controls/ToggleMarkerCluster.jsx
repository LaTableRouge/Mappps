import { __ } from '@wordpress/i18n'

export default function ToggleMarkerCluster({ defaultValue, setAttributes }) {
	return (
		<ToggleControl
			checked={defaultValue}
			help={defaultValue ? __('Markers will be clustered (The clustering cannot be seen in gutenberg)', 'mappps') : __('Markers will not be clustered', 'mappps')}
			label={__('Marker clustering', 'mappps')}
			onChange={(value) => {
				setAttributes({ isClustered: value })
			}}
		/>
	)
}
