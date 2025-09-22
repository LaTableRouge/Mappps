import { __experimentalNumberControl as NumberControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

export default function InputMaxZoom({ defaultValue, max, setAttributes }) {
	const handleChange = (value) => {
		if (value > max) {
			value = max
		}
		setAttributes({ selectedMaxZoom: value })
	}

	return (
		<NumberControl
			help={__('The maximum zoom level allowed for the map', 'mappps')}
			isShiftStepEnabled={false}
			label={__('Maximum zoom', 'mappps')}
			max={max}
			min={0}
			step={1}
			value={defaultValue > max ? max : defaultValue}
			onChange={handleChange}
		/>
	)
}
