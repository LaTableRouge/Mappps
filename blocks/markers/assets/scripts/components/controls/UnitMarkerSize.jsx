import { __experimentalUnitControl as UnitControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

const UNITS = [{ value: 'px', label: 'px', default: 0 }]

export default function UnitMarkerSize({ defaultValue, setAttributes }) {
	const handleChange = (value) => {
		setAttributes({ selectedMarkerSize: value })
	}

	return <UnitControl help={__('The displayed sizes of the marker icons', 'mappps')} label={__('Marker icon size', 'mappps')} units={UNITS} value={defaultValue} onChange={handleChange} />
}
