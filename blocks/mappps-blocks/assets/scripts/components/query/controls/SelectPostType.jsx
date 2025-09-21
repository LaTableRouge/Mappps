import { __ } from '@wordpress/i18n'

export default function SelectPostType({ defaultValue, onChange, options }) {
	return (
		<ToolsPanelItem isShownByDefault hasValue={() => defaultValue !== 'post'} label={__('Post type', 'mappps')} onDeselect={() => onChange('post')}>
			<SelectControl __next40pxDefaultSize __nextHasNoMarginBottom help={__('Select the type of content to display: posts, pages, or custom post types.', 'mappps')} label={__('Post type', 'mappps')} options={options} value={defaultValue} onChange={onChange} />
		</ToolsPanelItem>
	)
}
