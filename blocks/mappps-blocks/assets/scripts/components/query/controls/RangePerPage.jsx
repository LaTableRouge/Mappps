/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'

const MIN_POSTS_PER_PAGE = 1
const MAX_POSTS_PER_PAGE = 100

export default function RangePerPage({ defaultValue, offset = 0, onChange }) {
	return (
		<ToolsPanelItem hasValue={() => defaultValue > 0} label={__('Max items displayed', 'mappps')}>
			<RangeControl
				__next40pxDefaultSize
				__nextHasNoMarginBottom
				label={__('Max items displayed', 'mappps')}
				max={MAX_POSTS_PER_PAGE}
				min={MIN_POSTS_PER_PAGE}
				step={1}
				value={parseInt(defaultValue, 10)}
				onChange={(newPerPage) => {
					if (isNaN(newPerPage) || newPerPage < MIN_POSTS_PER_PAGE || newPerPage > MAX_POSTS_PER_PAGE) {
						return
					}
					onChange({ perPage: newPerPage, offset })
				}}
			/>
		</ToolsPanelItem>
	)
}
