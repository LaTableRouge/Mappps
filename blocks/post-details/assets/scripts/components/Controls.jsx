import { InspectorControls } from '@wordpress/block-editor'
import { PanelBody } from '@wordpress/components'
import { memo } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

import ToggleOpenInNewTab from './controls/ToggleOpenInNewTab'
import ToggleViewItinerary from './controls/ToggleViewItinerary'
import UnitDetailsSize from './controls/UnitDetailsSize'

function Controls({ attributes, setAttributes }) {
	return (
		<InspectorControls>
			<PanelBody initialOpen title={__('Render settings', 'mappps')}>
				<UnitDetailsSize defaultValue={attributes.selectedDetailsSize} setAttributes={setAttributes} />
				<ToggleOpenInNewTab defaultValue={attributes.showOpenInNewTab} setAttributes={setAttributes} />
				<ToggleViewItinerary defaultValue={attributes.showViewItinerary} setAttributes={setAttributes} />
			</PanelBody>
		</InspectorControls>
	)
}

export default memo(Controls)
