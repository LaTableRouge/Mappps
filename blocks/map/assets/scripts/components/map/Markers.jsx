import { Marker } from 'react-leaflet'

import Icon from './Icon'
import IconCustom from './IconCustom'

export default function Markers({ customMarkerIcon, haveShadow, markerRefs, posts, selectedPost, setSelectedPost, size, useIndividualMarkerPictures = false }) {
	const handleMarkerClick = (post, isSelected) => {
		if (!isSelected) {
			setSelectedPost(post)
		}
	}

	return posts.map((post, index) => {
		const { id, meta } = post
		const isSelected = selectedPost.id === id
		const position = [meta.lat, meta.lng]

		let markerPicture = post.meta?.mappps_marker || null
		try {
			markerPicture = JSON.parse(markerPicture)
		} catch (error) {
			console.error('Error parsing marker picture:', error)
			markerPicture = null
		}

		let iconComponent
		if (useIndividualMarkerPictures && markerPicture) {
			// Use individual marker picture
			iconComponent = IconCustom({
				picture: markerPicture,
				haveShadow,
				markerSize: size,
				isSelected
			})
		} else if (Object.keys(customMarkerIcon).length) {
			// Use global marker icon
			iconComponent = IconCustom({
				picture: customMarkerIcon,
				haveShadow,
				markerSize: size,
				isSelected
			})
		} else {
			// Use default icon
			iconComponent = Icon('', haveShadow, size, false, isSelected)
		}

		return (
			<Marker
				key={index}
				ref={markerRefs.current[index]}
				data={post}
				eventHandlers={{
					click: () => handleMarkerClick(post, isSelected)
				}}
				icon={iconComponent}
				position={position}
			/>
		)
	})
}
