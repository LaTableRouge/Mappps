import { InspectorControls } from '@wordpress/block-editor'
import { PanelBody } from '@wordpress/components'
import { memo } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

import UnitSidebarSize from './controls/UnitSidebarSize'

function Controls({ attributes, setAttributes }) {
	return (
		<InspectorControls>
			<PanelBody initialOpen title={__('Data settings', 'mappps')}>
				<UnitSidebarSize defaultValue={attributes.selectedSidebarSize} setAttributes={setAttributes} />
			</PanelBody>
		</InspectorControls>
	)
}

export default memo(Controls)
