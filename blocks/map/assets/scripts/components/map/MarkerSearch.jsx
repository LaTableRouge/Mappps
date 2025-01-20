import { Marker, Popup } from 'react-leaflet'

import Icon from './Icon'

export default function MarkerSearch(data, ref) {
  const { label, x, y } = data

  return (
    <Marker ref={ref} icon={Icon('search')} position={[y, x]}>
      <Popup>
        <div>
          <strong>{label}</strong>
        </div>
      </Popup>
    </Marker>
  )
}
