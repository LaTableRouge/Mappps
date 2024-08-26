import { __experimentalNumberControl as NumberControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

export default function InputMaxMarkerZoom({ defaultValue, max, setAttributes }) {
  return (
    <NumberControl
      help={__('The maximum zoom level allowed for the map when a marker is selected', 'mappps')}
      isShiftStepEnabled={false}
      label={__('Maximum marker zoom', 'mappps')}
      max={max}
      min={0}
      value={defaultValue}
      onChange={(value) => {
        setAttributes({ selectedMaxMarkerZoom: value })
      }}
    />
  )
}
