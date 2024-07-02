import MarkerClusterGroup from '@changey/react-leaflet-markercluster'

import Icon from './Icon'

export default function MarkerCluster(markers, color, size) {
  return (
    <MarkerClusterGroup key={Date.now()} iconCreateFunction={(cluster) => Icon('cluster', color, size, cluster)}>
      {markers}
    </MarkerClusterGroup>
  )
}
