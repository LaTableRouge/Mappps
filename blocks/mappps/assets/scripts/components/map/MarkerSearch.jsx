import { Marker, Popup } from 'react-leaflet'

import Icon from './Icon'

export default function MarkerSearch(data, ref) {
  return (
    <Marker ref={ref} icon={Icon('search')} position={[data.y, data.x]}>
      <Popup>
        <div>
          <strong>{data.label}</strong>
        </div>
      </Popup>
    </Marker>
  )
}