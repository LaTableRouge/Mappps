import { __ } from '@wordpress/i18n'
import { Marker, Popup } from 'react-leaflet'

import Icon from './Icon'

export default function MarkerGeolocation(coordinates, ref) {
  return (
    <Marker ref={ref} icon={Icon('geolocation')} position={coordinates}>
      <Popup>
        <div>
          <strong>{__('You are here', 'mappps')}</strong>
        </div>
      </Popup>
    </Marker>
  )
}
