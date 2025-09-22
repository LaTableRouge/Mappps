import { ToggleControl } from '@wordpress/components'
import { memo, useCallback } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

function ToggleLimitedSearch({ defaultValue, setAttributes }) {
	const handleChange = useCallback(
		(value) => {
			setAttributes({
				limitedSearch: value,
				selectedSearchResult: {}
			})
		},
		[setAttributes]
	)

	return (
		<ToggleControl
			checked={defaultValue}
			help={defaultValue ? __('Search results will be limited to the selected posts', 'mappps') : ''}
			label={__('Limit search results?', 'mappps')}
			onChange={handleChange}
		/>
	)
}

export default memo(ToggleLimitedSearch)
