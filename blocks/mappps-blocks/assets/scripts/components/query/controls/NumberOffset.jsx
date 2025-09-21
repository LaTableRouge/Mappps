import { __experimentalNumberControl as NumberControl, __experimentalToolsPanelItem as ToolsPanelItem } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

const MIN_OFFSET = 0
const MAX_OFFSET = 100

export default function NumberOffset({ defaultValue = 0, onChange }) {
	return (
		<ToolsPanelItem hasValue={() => defaultValue > 0} label={__('Offset', 'mappps')} onDeselect={() => onChange({ offset: 0 })}>
			<NumberControl
				__next40pxDefaultSize
				label={__('Offset', 'mappps')}
				min={MIN_OFFSET}
				value={defaultValue}
				onChange={(newOffset) => {
					if (isNaN(newOffset) || newOffset < MIN_OFFSET || newOffset > MAX_OFFSET) {
						return
					}
					onChange({ offset: newOffset })
				}}
			/>
		</ToolsPanelItem>
	)
}
