import { latLngBounds } from 'leaflet'
import { GestureHandling } from 'leaflet-gesture-handling'
import { useEffect, useState } from 'react'
import { useMap } from 'react-leaflet'

import { delay } from '../common/functions'

function ChangeView({ boundsPadding, markerGeolocation, markerOffset, markers, markerSearch, maxMarkerZoom, refCluster, refMarkerGeolocation }) {
  const map = useMap()

  async function zoomSmoothly(cluster = null, marker = null, popup) {
    if (cluster && marker) {
      await cluster.zoomToShowLayer(marker, (e) => {
        // Fix the cluster offset, but it's a bit clunky
        // const cluster = e.cluster
        // if (cluster) {
        //   addBoundsOffset(cluster)
        // }
      })

      await delay(300)
    }
    if (popup) {
      map.openPopup(popup)
    }
  }

  async function openPopup(marker) {
    await delay(300)

    if (marker && marker._popup) {
      marker.openPopup()
    }
  }

  async function zoomOntoMarker() {
    await delay(300)

    markers.forEach((marker) => {
      if (marker) {
        const popup = marker._popup
        zoomSmoothly(null, null, popup)
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
    map.invalidateSize()
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
    if (refMarkerGeolocation.current) {
      const marker = refMarkerGeolocation.current
      map.setView(marker.getLatLng(), maxMarkerZoom)
      openPopup(marker)
    }
  }, [markerGeolocation])

  useEffect(() => {
    if (refsMarker.current && refsMarker.current.length && Object.keys(selectedPost).length) {
      let selectedMarker = refsMarker.current.find((markerRef) => markerRef.current && markerRef.current.options.data.id === selectedPost.id)
      if (selectedMarker.current) {
        selectedMarker = selectedMarker.current

        addBoundsOffset(selectedMarker)

        zoomOntoMarker()
      }
    } else {
      map.fitBounds(bounds, { padding: [boundsPadding, boundsPadding] })
    }
  }, [selectedPost])

  return null
}

export default ChangeView
