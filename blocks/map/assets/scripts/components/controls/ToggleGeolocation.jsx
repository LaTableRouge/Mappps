import { ToggleControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

export default function ToggleGeolocation({ defaultValue, setAttributes }) {
  const handleChange = (value) => {
    setAttributes({ isGeolocated: value })
  }

  const helpText = defaultValue ? __('Users will be able to geolocate themselves', 'mappps') : ''

  return <ToggleControl checked={defaultValue} help={helpText} label={__('Geolocation', 'mappps')} onChange={handleChange} />
}
