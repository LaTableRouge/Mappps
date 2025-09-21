import { InspectorControls } from '@wordpress/block-editor'
import { PanelBody } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

import UnitSpinnerSize from './controls/UnitSpinnerSize'

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
