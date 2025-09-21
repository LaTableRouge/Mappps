import MarkerClusterGroup from '../../../../../../src/helpers/scripts/MarkerCluster'
import Icon from './Icon'

export default function MarkerCluster(markers, size, clusterRef, haveShadow, canZoomToMarker) {
	const clusterIcon = (cluster) => Icon('cluster', haveShadow, size, cluster, false)

	return (
		<MarkerClusterGroup key={Date.now()} ref={clusterRef} iconCreateFunction={clusterIcon} zoomToBoundsOnClick={canZoomToMarker} onClick={(event) => !canZoomToMarker && event.layer.spiderfy()}>
			{markers}
		</MarkerClusterGroup>
	)
}
