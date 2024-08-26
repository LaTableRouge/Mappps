import { InspectorControls } from '@wordpress/block-editor'
import { PanelBody } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

import UnitSpinnerSize from './controls/UnitSpinnerSize'

export default function Controls({ attributes, setAttributes }) {
  return (
    <InspectorControls>
      <PanelBody initialOpen={true} title={__('Render settings', 'mappps')}>
        <UnitSpinnerSize defaultValue={attributes.selectedSpinnerSize} setAttributes={setAttributes} />
      </PanelBody>
    </InspectorControls>
  )
}
