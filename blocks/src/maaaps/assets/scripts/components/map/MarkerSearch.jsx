import { Marker, Popup, Rectangle } from 'react-leaflet'

import Icon from './Icon'

export default function MarkerSearch(color, data, ref) {
  return (
    <>
      <Marker ref={ref} icon={Icon('search', color)} position={[data.y, data.x]}>
        <Popup>
          <div>
            <strong>{data.label}</strong>
          </div>
        </Popup>
      </Marker>
      <Rectangle bounds={data.bounds} pathOptions={{ color }} />
    </>
  )
}
