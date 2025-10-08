import { SelectControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

export default function SelectDisplayType({ defaultValue, setAttributes }) {
	const options = [
		{ label: __('Map + Sidebar', 'mappps'), value: 'full' },
		{ label: __('Map', 'mappps'), value: 'map' }
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
