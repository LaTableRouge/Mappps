import { memo } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

function Controls({ attributes, setAttributes }) {
	return (
		<InspectorControls>
			<PanelBody initialOpen title={__('Data settings', 'mappps')}>
				<UnitDetailsSize defaultValue={attributes.selectedDetailsSize} setAttributes={setAttributes} />
			</PanelBody>
		</InspectorControls>
	)
}

export default memo(Controls)
