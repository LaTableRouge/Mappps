import { Marker } from 'react-leaflet'

import Icon from './Icon'
import IconCustom from './IconCustom'

export default function Markers(posts, markerRefs, size, selectedPost, setSelectedPost, haveShadow, haveCustomMarkers, customMarker) {
  const handleMarkerClick = (post, isSelected) => {
    if (!isSelected) {
      setSelectedPost(post)
    }
  }

  return posts.map((post, index) => {
    const { id, meta } = post
    const isSelected = selectedPost.id === id
    const position = [meta.lat, meta.lng]

    return (
      <Marker
        key={index}
        ref={markerRefs.current[index]}
        data={post}
        eventHandlers={{
          click: () => handleMarkerClick(post, isSelected)
        }}
        icon={
          haveCustomMarkers && Object.keys(customMarker).length
            ? IconCustom({ picture: customMarker, haveShadow, markerSize: size, isSelected })
            : Icon('', haveShadow, size, false, isSelected)
        }
        position={position}
      />
    )
  })
}
