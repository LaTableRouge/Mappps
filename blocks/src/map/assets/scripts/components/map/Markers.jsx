import { Marker } from 'react-leaflet'

import Icon from './Icon'

export default function Markers(posts, size, selectedPost, setSelectedPost) {
  return posts.map((post, index) => {
    const isSelected = selectedPost.id === post.id

    return (
      <Marker
        key={index}
        data={post}
        eventHandlers={{
          click: (e) => {
            if (!isSelected) {
              setSelectedPost(post)
            }
          }
        }}
        icon={Icon('', size, false, isSelected)}
        position={[post.meta.lat, post.meta.lng]}
      />
    )
  })
}