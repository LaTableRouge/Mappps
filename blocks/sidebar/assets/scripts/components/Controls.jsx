import { InspectorControls } from '@wordpress/block-editor'
import { PanelBody } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

import UnitSidebarSize from './controls/UnitSidebarSize'

export default function Controls({ attributes, setAttributes }) {
  return (
    <InspectorControls>
      <PanelBody initialOpen={true} title={__('Data settings', 'mappps')}>
        <UnitSidebarSize defaultValue={attributes.selectedSidebarSize} setAttributes={setAttributes} />
      </PanelBody>
    </InspectorControls>
  )
}
