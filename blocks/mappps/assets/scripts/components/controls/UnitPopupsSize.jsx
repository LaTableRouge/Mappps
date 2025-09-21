import { __ } from '@wordpress/i18n'

export default function UnitPopupsSize({ defaultValue, setAttributes }) {
	return (
		<UnitControl
			help={__('Desktop only, set the maximum size for the details popup', 'mappps')}
			label={__('Popups size', 'mappps')}
			units={[
				{ value: 'px', label: 'px', default: 0 },
				{ value: 'cqw', label: 'cqw', default: 0 },
				{ value: '%', label: '%', default: 0 }
			]}
			value={defaultValue}
			onChange={(value) => {
				setAttributes({ selectedPopupsSize: value })
			}}
		/>
	)
}
