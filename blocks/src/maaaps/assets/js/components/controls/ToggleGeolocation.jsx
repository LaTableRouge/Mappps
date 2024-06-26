import { ToggleControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

export default function ToggleGeolocation(props) {
  const { defaultValue, setAttributes } = props

  // See here : https://codesandbox.io/s/how-to-locate-react-leaflet-v3x-map-to-users-current-position-and-get-the-borders-for-this-map-g1onh?file=/src/App.js:410-431
  return (
    <ToggleControl
      label={__('Geolocation', 'maaaps')}
      help={defaultValue ? __('Users will be able to geolocate themselves', 'maaaps') : ''}
      checked={defaultValue}
      onChange={(value) => {
        setAttributes({ isGeolocated: value })
      }}
    />
  )
}
