import { latLngBounds } from 'leaflet'
import { GestureHandling } from 'leaflet-gesture-handling'
import { useEffect, useState } from 'react'
import { useMap } from 'react-leaflet'

import { delay } from '../common/functions'

function ChangeView({ boundsPadding, markerGeolocation, markerOffset, markers, markerSearch, maxMarkerZoom, refCluster, refMarkerSearch, refsMarker, selectedPost }) {
  const map = useMap()

  async function zoomSmoothly(cluster = null, marker = null, popup) {
    if (cluster && marker) {
      await cluster.zoomToShowLayer(marker)
      await delay(300)
    }
    if (popup) {
      await map.openPopup(popup)
    }
  }

  const zoomOntoMarker = async () => {
    await delay(300)

    refsMarker.current.forEach((markerRef, i) => {
      const marker = markerRef.current
      const cluster = refCluster.current
      if (marker) {
        const popup = marker._popup
        if (marker.options.data.id === selectedPost.id) {
          const parentElement = cluster.getVisibleParent(marker)
          if (parentElement) {
            if (!parentElement._preSpiderfyLatlng && parentElement._childCount) {
              zoomSmoothly(cluster, marker, popup)
            } else {
              zoomSmoothly(null, null, popup)
            }
          } else {
            zoomSmoothly(null, null, popup)
          }
        }
      }
    })
  }

  const [bounds, setBounds] = useState(() => {
    const markerBounds = latLngBounds([])
    if (markers.length) {
      markers.forEach((marker) => {
        if (marker != null) {
          markerBounds.extend([marker.props.position])
        }
      })
    }
    return markerBounds
  })

  useEffect(() => {
    map.addHandler('gestureHandling', GestureHandling)
    map.gestureHandling.enable()
  }, [map])

  const markerBounds = latLngBounds([])

  useEffect(() => {
    if (markers.length) {
      markers.forEach((marker) => {
        if (marker != null) {
          markerBounds.extend([marker.props.position])
        }
      })
      setBounds(markerBounds)
    }
  }, [markers])

  useEffect(() => {
    if (markerGeolocation) {
      map.setView(markerGeolocation.props.position, maxMarkerZoom)
    }
  }, [markerGeolocation])

  useEffect(() => {
    if (refMarkerSearch.current) {
      // map.fitBounds(refMarkerSearch.current.getBounds(), { padding: [10, 10] })
      map.setView(refMarkerSearch.current.getLatLng(), maxMarkerZoom)
    }
  }, [markerSearch])

  useEffect(() => {
    if (markers.length && Object.keys(selectedPost).length) {
      const selectedMarker = markers.find((marker) => marker.props.data.id === selectedPost.id)
      if (selectedMarker) {
        map.fitBounds([selectedMarker.props.position], { paddingTopLeft: [markerOffset, 0], maxZoom: maxMarkerZoom })
        zoomOntoMarker()
      }
    } else {
      map.fitBounds(bounds, { padding: [boundsPadding, boundsPadding] })
    }
  }, [selectedPost])

  return null
}

export default ChangeView
