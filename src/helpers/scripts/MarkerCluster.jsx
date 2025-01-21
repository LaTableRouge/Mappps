import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'

import './leaflet.markercluster'

import { createPathComponent } from '@react-leaflet/core'
import L from 'leaflet'

function createMarkerCluster({ children: _c, ...props }, context) {
  const clusterProps = {}
  const clusterEvents = {}

  // Splitting props and events to different objects
  Object.entries(props).forEach(([propName, prop]) =>
    (propName.startsWith('on') ? (clusterEvents[propName] = prop) : (clusterProps[propName] = prop))
  )

  // Create instance with unique ID and safe defaults
  const instance = new L.MarkerClusterGroup({
    ...clusterProps,
    chunkedLoading: true,
    removeOutsideVisibleBounds: false,
    animate: true
  })

  // Store instance reference in context
  if (context.map) {
    context.map._markerClusterInstances = context.map._markerClusterInstances || new Set()
    context.map._markerClusterInstances.add(instance)
  }

  // Initializing event listeners
  Object.entries(clusterEvents).forEach(([eventAsProp, callback]) => {
    const clusterEvent = `cluster${eventAsProp.substring(2).toLowerCase()}`
    instance.on(clusterEvent, callback)
  })

  // Add safe cleanup function
  instance.cleanup = () => {
    try {
      if (context.map) {
        context.map._markerClusterInstances?.delete(instance)
      }
      instance._cleanup?.()
    } catch (e) {
      console.warn('Error during instance cleanup:', e)
    }
  }

  return {
    instance,
    context: {
      ...context,
      layerContainer: instance
    }
  }
}

const MarkerCluster = createPathComponent(createMarkerCluster)

export default MarkerCluster
