import { ToggleControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

export default function ToggleCustomMarkers({ defaultValue, setAttributes }) {
  const handleChange = (value) => {
    setAttributes({ haveCustomMarkers: value })
  }

  const helpText = defaultValue ? __('Customize the marker pictures', 'mappps') : ''

  return <ToggleControl checked={defaultValue} help={helpText} label={__('Customize markers', 'mappps')} onChange={handleChange} />
}
