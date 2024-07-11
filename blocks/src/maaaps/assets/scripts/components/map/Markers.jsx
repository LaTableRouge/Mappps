import { Marker, Popup } from 'react-leaflet'

import Icon from './Icon'

export default function Markers(posts, color, size, markerRefs, postRefs, setSelectedPost, selectedPost) {
  return posts.map((post, index) => {
    const isSelected = selectedPost.id === post.id

    return (
      <Marker
        key={index}
        ref={markerRefs.current[index]}
        data={post}
        eventHandlers={{
          click: (e) => {
            setSelectedPost(post)

            const associatedPost = postRefs.current[index]
            if (associatedPost.current) {
              associatedPost.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
          }
        }}
        icon={Icon('', color, size, false, isSelected)}
        position={[post.meta.lat, post.meta.lng]}
      >
        <Popup>
          <div>
            <strong>{post.title.raw}</strong>
          </div>
          <div dangerouslySetInnerHTML={{ __html: post.excerpt.raw }} />
        </Popup>
      </Marker>
    )
  })
}
