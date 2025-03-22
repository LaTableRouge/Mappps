import { ToggleControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

export default function ToggleMarkerShadow({ defaultValue, setAttributes }) {
  const handleChange = (value) => {
    setAttributes({ haveShadow: value })
  }

  const helpText = defaultValue ? __('Markers will have a shadow beneath them', 'mappps') : ''

  return <ToggleControl checked={defaultValue} help={helpText} label={__('Marker shadow', 'mappps')} onChange={handleChange} />
}
