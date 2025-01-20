import { InspectorControls } from '@wordpress/block-editor'
import { memo } from '@wordpress/element'

import ColorMap from './controls/ColorMap'

function Controls({ attributes, setAttributes }) {
  return (
    <InspectorControls>
      <ColorMap defaultValue={attributes.bgHoverColor} setAttributes={setAttributes} />
    </InspectorControls>
  )
}

export default memo(Controls)
