import { __ } from '@wordpress/i18n'
import { Marker, Popup } from 'react-leaflet'

import Icon from './Icon'
import IconCustom from './IconCustom'

export default function MarkerGeolocation(coordinates, ref, haveShadow, customMarkerGeolocationIcon) {
	return (
		<Marker
			ref={ref}
			icon={
				Object.keys(customMarkerGeolocationIcon).length ? IconCustom({ picture: customMarkerGeolocationIcon, haveShadow, type: 'geolocation' }) : Icon('geolocation', haveShadow)
			}
			position={coordinates}
		>
			<Popup>
				<div>
					<strong>{__('You are here', 'mappps')}</strong>
				</div>
			</Popup>
		</Marker>
	)
}
