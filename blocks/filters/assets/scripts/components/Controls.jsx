import { InspectorControls } from '@wordpress/block-editor'
import { PanelBody } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

import UnitFiltersSize from './controls/UnitFiltersSize'

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
