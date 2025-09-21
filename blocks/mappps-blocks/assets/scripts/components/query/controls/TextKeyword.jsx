import { __experimentalToolsPanelItem as ToolsPanelItem, TextControl } from '@wordpress/components'
import { debounce } from '@wordpress/compose'
import { useMemo } from '@wordpress/element'
import { __ } from '@wordpress/i18n'
export default function TextKeyword({ defaultValue, setQuery }) {
	const debouncedQuerySearch = useMemo(() => {
		return debounce((newQuerySearch) => {
			setQuery({
				search: newQuerySearch
			})
		}, 250)
	}, [setQuery])

	return (
		<ToolsPanelItem
			hasValue={() => !!defaultValue}
			label={__('Keyword', 'mappps')}
			onDeselect={() => {
				setQuery({ search: '' })
			}}
		>
			<TextControl
				__next40pxDefaultSize
				__nextHasNoMarginBottom
				label={__('Keyword', 'mappps')}
				value={defaultValue}
				onChange={(newQuerySearch) => {
					debouncedQuerySearch(newQuerySearch)
				}}
			/>
		</ToolsPanelItem>
	)
}
