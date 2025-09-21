import { __ } from '@wordpress/i18n'

export default function Controls({ attributes, setAttributes }) {
	const { selectedSpinnerSize } = attributes

	return (
		<InspectorControls>
			<PanelBody initialOpen title={__('Render settings', 'mappps')}>
				<UnitSpinnerSize defaultValue={selectedSpinnerSize} setAttributes={setAttributes} />
			</PanelBody>
		</InspectorControls>
	)
}
