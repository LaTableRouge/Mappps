import { latLngBounds } from 'leaflet'
import { GestureHandling } from 'leaflet-gesture-handling'
import { useEffect, useState } from 'react'
import { useMap } from 'react-leaflet'

function ChangeView({ center, zoom, markers, posts }) {
  const map = useMap()

  useEffect(() => {
    map.addHandler('gestureHandling', GestureHandling)
    map.gestureHandling.enable()
  }, [map])

  // --------------- Change map bounds when the marker list change to fit the displayed markers onto the map
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
  }, [posts])

  useEffect(() => {
    map.fitBounds(bounds)
  }, [bounds])

  return null
}

export default ChangeView
