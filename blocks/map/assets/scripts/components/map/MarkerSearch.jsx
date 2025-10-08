import { Marker, Popup } from 'react-leaflet'

import Icon from './Icon'
import IconCustom from './IconCustom'

export default function MarkerSearch(data, ref, haveShadow, customMarkerSearchIcon) {
	const { label, x, y } = data

	return (
		<Marker
			ref={ref}
			icon={Object.keys(customMarkerSearchIcon).length ? IconCustom({ picture: customMarkerSearchIcon, haveShadow, type: 'search' }) : Icon('search', haveShadow)}
			position={[y, x]}
		>
			<Popup>
				<div>
					<strong>{label}</strong>
				</div>
			</Popup>
		</Marker>
	)
}
