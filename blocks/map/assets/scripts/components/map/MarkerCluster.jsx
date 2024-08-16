import MarkerClusterGroup from '@changey/react-leaflet-markercluster'

import Icon from './Icon'

// https://codesandbox.io/p/sandbox/react-leaflet-markercluster-state-issue-react-18-forked-r8t5d9?file=%2Fpackage.json
export default function MarkerCluster(markers, size, clusterRef) {
  return (
    <MarkerClusterGroup key={Date.now()} ref={clusterRef} iconCreateFunction={(cluster) => Icon('cluster', size, cluster, false)}>
      {markers}
    </MarkerClusterGroup>
  )
}
