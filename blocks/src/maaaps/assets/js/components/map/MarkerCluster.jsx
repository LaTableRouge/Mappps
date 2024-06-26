import MarkerClusterGroup from '@changey/react-leaflet-markercluster'

import Icon from './Icon'

export default function MarkerCluster(markers, color) {
  return (
    <MarkerClusterGroup iconCreateFunction={(cluster) => Icon('cluster', color, false, cluster)} key={Date.now()}>
      {markers}
    </MarkerClusterGroup>
  )
}
