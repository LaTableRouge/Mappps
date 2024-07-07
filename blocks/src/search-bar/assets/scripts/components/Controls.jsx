import { InspectorControls } from '@wordpress/block-editor'
import { PanelBody } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

import ToggleLimitedSearch from './controls/ToggleLimitedSearch'

export default function Controls({ limitedSearch, setAttributes }) {
  return (
    <InspectorControls>
      <PanelBody initialOpen={true} title={__('Data settings', 'maaaps')}>
        <ToggleLimitedSearch defaultValue={limitedSearch} setAttributes={setAttributes} />
      </PanelBody>
    </InspectorControls>
  )
}
