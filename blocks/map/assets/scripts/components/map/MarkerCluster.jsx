import { useEffect } from 'react'

import MarkerClusterGroup from '../../../../../../src/helpers/scripts/MarkerCluster'
import Icon from './Icon'

export default function MarkerCluster(markers, size, clusterRef) {
  useEffect(() => {
    return () => {
      if (clusterRef.current) {
        clusterRef.current.destroy?.();
      }
    }
  }, [])

  return (
    <MarkerClusterGroup
      key={Date.now()}
      ref={clusterRef}
      chunkedLoading={true}
      removeOutsideVisibleBounds={false}
      iconCreateFunction={(cluster) => Icon('cluster', size, cluster, false)}
    >
      {markers}
    </MarkerClusterGroup>
  )
}
