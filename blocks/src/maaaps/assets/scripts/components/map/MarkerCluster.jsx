import MarkerClusterGroup from '@changey/react-leaflet-markercluster'

import Icon from './Icon'

export default function MarkerCluster(markers, size, clusterRef, selectedPost) {
  return (
    <MarkerClusterGroup
      // key={Date.now()}
      ref={clusterRef}
      iconCreateFunction={(cluster) => Icon('cluster', size, cluster, selectedPost)}
    >
      {markers}
    </MarkerClusterGroup>
  )
}
