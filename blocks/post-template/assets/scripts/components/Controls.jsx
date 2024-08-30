import { InspectorControls } from '@wordpress/block-editor'

import ColorMap from './controls/ColorMap'

export default function Controls({ attributes, setAttributes }) {
  return (
    <InspectorControls>
      <ColorMap defaultValue={attributes.bgHoverColor} setAttributes={setAttributes} />
    </InspectorControls>
  )
}
