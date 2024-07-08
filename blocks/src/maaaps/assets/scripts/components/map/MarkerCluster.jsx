import MarkerClusterGroup from '@changey/react-leaflet-markercluster'

import Icon from './Icon'

export default function MarkerCluster(markers, color, size, ref) {
  return (
    <MarkerClusterGroup
      // key={Date.now()}
      ref={ref}
      iconCreateFunction={(cluster) => Icon('cluster', color, size, cluster)}
    >
      {markers}
    </MarkerClusterGroup>
  )
}
