import { Marker, Popup, Rectangle } from 'react-leaflet'

import Icon from './Icon'

export default function MarkerSearch({ color, selectedSearchResult }) {
  return (
    <>
      <Marker icon={Icon('', color)} position={[selectedSearchResult.y, selectedSearchResult.x]}>
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
