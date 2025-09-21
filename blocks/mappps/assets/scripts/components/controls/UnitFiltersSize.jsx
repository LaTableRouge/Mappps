import { __ } from '@wordpress/i18n'

export default function UnitFiltersSize({ defaultValue, setAttributes }) {
	return (
		<UnitControl
			help={__('Desktop only, set the maximum size for the filter popup', 'mappps')}
			label={__('Filters size', 'mappps')}
			units={[
				{ value: 'px', label: 'px', default: 0 },
				{ value: 'cqw', label: 'cqw', default: 0 },
				{ value: '%', label: '%', default: 0 }
			]}
			value={defaultValue}
			onChange={(value) => {
				setAttributes({ selectedFiltersSize: value })
			}}
		/>
	)
}
