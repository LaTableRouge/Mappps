import { InspectorControls } from '@wordpress/block-editor'
import { PanelBody } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

import UnitDetailsSize from './controls/UnitDetailsSize'

export default function Controls({ attributes, setAttributes }) {
  return (
    <InspectorControls>
      <PanelBody initialOpen={true} title={__('Data settings', 'mappps')}>
        <UnitDetailsSize defaultValue={attributes.selectedDetailsSize} setAttributes={setAttributes} />
      </PanelBody>
    </InspectorControls>
  )
}
