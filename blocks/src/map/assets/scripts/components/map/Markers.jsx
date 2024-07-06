import { Marker, Popup } from 'react-leaflet'

// import redFilledMarker from '../../../img/red-filled-marker.svg'
import Icon from './Icon'

export default function Markers(posts, color, size) {
  return posts.map((post, index) => (
    <Marker key={index} data={post} icon={Icon('', color, size)} position={[post.meta.lat, post.meta.lng]}>
      <Popup>
        <div>
          <strong>{post.title.rendered}</strong>
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
      </Popup>
    </Marker>
  ))
}
