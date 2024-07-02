import { __experimentalNumberControl as NumberControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

export default function InputMaxZoom(props) {
  const { defaultValue, setAttributes } = props

  return (
    <NumberControl
      help={__('The maximum zoom level allowed for the map', 'maaaps')}
      isShiftStepEnabled={false}
      label={__('Maximum zoom', 'maaaps')}
      min={0}
      value={defaultValue}
      onChange={(value) => {
        setAttributes({ selectedMaxZoom: value })
      }}
    />
  )
}
