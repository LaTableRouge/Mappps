import { InspectorControls } from '@wordpress/block-editor'
import { PanelBody } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

import UnitFiltersSize from './controls/UnitFiltersSize'

export default function Controls({ attributes, setAttributes }) {
  return (
    <InspectorControls>
      <PanelBody initialOpen={true} title={__('Data settings', 'maaaps')}>
        <UnitFiltersSize defaultValue={attributes.selectedFiltersSize} setAttributes={setAttributes} />
      </PanelBody>
    </InspectorControls>
  )
}
