import { __experimentalUnitControl as UnitControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

export default function UnitMarkerClusterSize({ defaultValue, setAttributes }) {
	return (
		<UnitControl
			help={__('The displayed sizes of the cluster icons', 'mappps')}
			label={__('Cluster icon size', 'mappps')}
			units={[{ value: 'px', label: 'px', default: 0 }]}
			value={defaultValue}
			onChange={(value) => {
				setAttributes({ selectedMarkerClusterSize: value })
			}}
		/>
	)
}
