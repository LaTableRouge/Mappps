import { Marker } from 'react-leaflet'

import Icon from './Icon'

export default function Markers(posts, size) {
  return posts.map((post, index) => {
    return <Marker key={index} data={post} icon={Icon('', size, false, false)} position={[post.meta.lat, post.meta.lng]} />
  })
}
