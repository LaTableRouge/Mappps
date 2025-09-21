import { __ } from '@wordpress/i18n'

export default function InputMaxMarkerZoom({ defaultValue, max, setAttributes }) {
	const handleChange = (value) => {
		setAttributes({ selectedMaxMarkerZoom: value })
	}

	return <NumberControl help={__('The maximum zoom level allowed for the map when a marker is selected', 'mappps')} isShiftStepEnabled={false} label={__('Maximum marker zoom', 'mappps')} max={max} min={0} value={defaultValue} onChange={handleChange} />
}
