import { __experimentalNumberControl as NumberControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

export default function InputMaxZoom({ defaultValue, setAttributes }) {
  const handleChange = (value) => {
    setAttributes({ selectedMaxZoom: value })
  }

  return (
    <NumberControl
      help={__('The maximum zoom level allowed for the map', 'mappps')}
      isShiftStepEnabled={false}
      label={__('Maximum zoom', 'mappps')}
      min={0}
      value={defaultValue}
      onChange={handleChange}
    />
  )
}
