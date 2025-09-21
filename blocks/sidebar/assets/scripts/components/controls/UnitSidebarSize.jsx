import { memo, useCallback } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

const UNITS = [
	{ value: 'px', label: 'px', default: 0 },
	{ value: 'cqw', label: 'cqw', default: 0 },
	{ value: '%', label: '%', default: 0 }
]

function UnitSidebarSize({ defaultValue, setAttributes }) {
	const handleChange = useCallback(
		(value) => {
			if (!value) return

			setAttributes({ selectedSidebarSize: value })
		},
		[setAttributes]
	)

	return <UnitControl help={__('Desktop only', 'mappps')} label={__('Sidebar size', 'mappps')} units={UNITS} value={defaultValue} onChange={handleChange} />
}

export default memo(UnitSidebarSize)
