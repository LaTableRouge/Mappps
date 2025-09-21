/**
 * WordPress dependencies
 */
import { __experimentalNumberControl as NumberControl, __experimentalToolsPanelItem as ToolsPanelItem } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

export default function NumberPages({ defaultValue, onChange }) {
	return (
		<ToolsPanelItem hasValue={() => defaultValue > 0} label={__('Max pages to show', 'mappps')} onDeselect={() => onChange({ pages: 0 })}>
			<NumberControl
				__next40pxDefaultSize
				help={__('Limit the pages you want to show, even if the query has more results. To show all pages use 0 (zero).', 'mappps')}
				label={__('Max pages to show', 'mappps')}
				min={0}
				value={defaultValue}
				onChange={(newPages) => {
					if (isNaN(newPages) || newPages < 0) {
						return
					}
					onChange({ pages: newPages })
				}}
			/>
		</ToolsPanelItem>
	)
}
