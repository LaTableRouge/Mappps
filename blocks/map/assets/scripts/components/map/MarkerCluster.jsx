import MarkerClusterGroup from '../../../../../../src/helpers/scripts/MarkerCluster'
import Icon from './Icon'

export default function MarkerCluster(markers, size, clusterRef) {
  const clusterIcon = (cluster) => Icon('cluster', size, cluster, false)

  return (
    <MarkerClusterGroup key={Date.now()} ref={clusterRef} iconCreateFunction={clusterIcon}>
      {markers}
    </MarkerClusterGroup>
  )
}
