import MarkerClusterGroup from '../../../../../../src/helpers/scripts/MarkerCluster'
import Icon from './Icon'
import IconCustom from './IconCustom'

export default function MarkerCluster(markers, size, clusterRef, haveShadow, canZoomToMarker, customMarkerClusterIcon) {
	const clusterIcon = (cluster) =>
		Object.keys(customMarkerClusterIcon).length
			? IconCustom({ picture: customMarkerClusterIcon, haveShadow, markerSize: size, type: 'cluster', cluster })
			: Icon('cluster', haveShadow, size, cluster, false)

	return (
		<MarkerClusterGroup
			key={Date.now()}
			ref={clusterRef}
			iconCreateFunction={clusterIcon}
			zoomToBoundsOnClick={canZoomToMarker}
			onClick={(event) => !canZoomToMarker && event.layer.spiderfy()}
		>
			{markers}
		</MarkerClusterGroup>
	)
}
