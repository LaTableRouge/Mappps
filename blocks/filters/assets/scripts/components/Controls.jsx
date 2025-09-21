import { __ } from '@wordpress/i18n'

export default function Controls({ attributes, setAttributes }) {
	const { selectedFiltersSize } = attributes

	return (
		<InspectorControls>
			<PanelBody initialOpen title={__('Data settings', 'mappps')}>
				<UnitFiltersSize defaultValue={selectedFiltersSize} setAttributes={setAttributes} />
			</PanelBody>
		</InspectorControls>
	)
}
