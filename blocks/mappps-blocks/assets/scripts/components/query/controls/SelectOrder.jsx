import { __experimentalToolsPanelItem as ToolsPanelItem, SelectControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

const defaultOrderByOptions = [
	{
		label: __('Newest to oldest', 'mappps'),
		value: 'date/desc'
	},
	{
		label: __('Oldest to newest', 'mappps'),
		value: 'date/asc'
	},
	{
		/* translators: Label for ordering posts by title in ascending order. */
		label: __('A → Z', 'mappps'),
		value: 'title/asc'
	},
	{
		/* translators: Label for ordering posts by title in descending order. */
		label: __('Z → A', 'mappps'),
		value: 'title/desc'
	}
]

export default function SelectOrder({ defaultValue, onChange, options = defaultOrderByOptions }) {
	const { order, orderBy } = defaultValue
	return (
		<ToolsPanelItem
			isShownByDefault
			hasValue={() => order !== 'desc' || orderBy !== 'date'}
			label={__('Order by', 'mappps')}
			onDeselect={() => onChange({ order: 'desc', orderBy: 'date' })}
		>
			<SelectControl
				__next40pxDefaultSize
				__nextHasNoMarginBottom
				label={__('Order by', 'mappps')}
				options={options}
				value={`${orderBy}/${order}`}
				onChange={(value) => {
					const [newOrderBy, newOrder] = value.split('/')
					onChange({ order: newOrder, orderBy: newOrderBy })
				}}
			/>
		</ToolsPanelItem>
	)
}
