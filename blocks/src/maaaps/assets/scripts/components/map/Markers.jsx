import { Marker, Popup } from 'react-leaflet'

import Icon from './Icon'

export default function Markers(posts, size, markerRefs, postRefs, setSelectedPost, selectedPost) {
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

            // Scroll the sidebar
            const associatedPost = postRefs.current[index]
            if (associatedPost.current) {
              const target = associatedPost.current
              const parent = associatedPost.current.parentNode
              parent.scroll({ top: target.offsetTop - parent.offsetTop, behavior: 'smooth' })
            }
          }
        }}
        icon={Icon('', size, false, isSelected)}
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
