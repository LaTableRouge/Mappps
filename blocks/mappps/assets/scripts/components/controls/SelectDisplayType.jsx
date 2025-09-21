import { __ } from '@wordpress/i18n'

export default function SelectDisplayType({ defaultValue, setAttributes }) {
	const options = [
		{ label: __('Map + Sidebar'), value: 'full' },
		{ label: __('Map'), value: 'map' }
	]

	return (
		<SelectControl
			defaultValue={defaultValue}
			label={__('Display mode', 'mappps')}
			options={options}
			onChange={(value) => {
				setAttributes({ selectedDisplayType: value })
			}}
		/>
	)
}
