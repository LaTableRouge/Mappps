import { Marker, Popup } from 'react-leaflet'

// import redFilledMarker from '../../../img/red-filled-marker.svg'
import Icon from './Icon'

export default function Markers(posts, color) {
  return posts.map((post, index) => (
    <Marker key={index} position={[post.meta.lat, post.meta.lng]} icon={Icon('', color)} data={post}>
      <Popup>
        <div>
          <strong>{post.title.rendered}</strong>
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
      </Popup>
    </Marker>
  ))
}
