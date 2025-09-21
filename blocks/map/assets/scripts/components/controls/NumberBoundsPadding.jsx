import { __ } from '@wordpress/i18n'

export default function InputBoundsPadding({ defaultValue, setAttributes }) {
	const handleChange = (value) => {
		setAttributes({ selectedBoundsPadding: value })
	}

	return <NumberControl help={__('The padding value for the bounds of the map', 'mappps')} isShiftStepEnabled={false} label={__('Bounds padding', 'mappps')} min={0} value={defaultValue} onChange={handleChange} />
}
