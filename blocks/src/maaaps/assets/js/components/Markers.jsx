import { Marker, Popup } from 'react-leaflet'

export default function Markers(posts) {
  return posts.map((post, index) => (
    <Marker key={index} position={[post.meta.lat, post.meta.lng]}>
      <Popup>
        <div>
          <strong>{post.title.rendered}</strong>
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
      </Popup>
    </Marker>
  ))
}
