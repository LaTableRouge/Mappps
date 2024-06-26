import L from 'leaflet'
import { Marker, Popup } from 'react-leaflet'

import redFilledMarker from '../../../img/red-filled-marker.svg'

export default function Markers(posts) {
  const redMarker = L.icon({
    iconUrl: redFilledMarker,
    iconSize: [40, 40],
    iconAnchor: [20, 40]
  })

  return posts.map((post, index) => (
    <Marker key={index} position={[post.meta.lat, post.meta.lng]} icon={redMarker}>
      <Popup>
        <div>
          <strong>{post.title.rendered}</strong>
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
      </Popup>
    </Marker>
  ))
}
