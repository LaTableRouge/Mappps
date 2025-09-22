import { __experimentalUnitControl as UnitControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

const UNITS = [{ value: 'px', label: 'px', default: 0 }]

export default function UnitSize({ attributeKey, defaultValue, setAttributes }) {
	const handleChange = (value) => {
		setAttributes({ [attributeKey]: value })
	}

	return <UnitControl help={__('The displayed sizes of the icons', 'mappps')} label={__('Icon size', 'mappps')} units={UNITS} value={defaultValue} onChange={handleChange} />
}
