import { Marker, Popup, Rectangle } from 'react-leaflet'

import Icon from './Icon'

export default function MarkerSearch({ selectedSearchResult, color }) {
  return (
    <>
      <Marker position={[selectedSearchResult.y, selectedSearchResult.x]} icon={Icon('', color)}>
        <Popup>
          <div>
            <strong>{selectedSearchResult.label}</strong>
          </div>
        </Popup>
      </Marker>
      <Rectangle bounds={selectedSearchResult.bounds} pathOptions={{ color }} />
    </>
  )
}
