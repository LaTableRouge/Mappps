import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet/dist/leaflet.css'
import '@changey/react-leaflet-markercluster/dist/styles.min.css'
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css'

import { useMemo, useState } from '@wordpress/element'
import { MapContainer, TileLayer } from 'react-leaflet'

import ChangeView from '../utils/ChangeView'
import MapControls from './map/MapControls'
import MarkerCluster from './map/MarkerCluster'
import MarkerGeolocation from './map/MarkerGeolocation'
import Markers from './map/Markers'

// import MarkerSearch from './map/MarkerSearch'

const Map = ({ colors, isClustered, isGeolocated, posts, selectedMapTiles, selectedMarkerClusterSize, selectedMarkerSize, selectedMaxZoom }) => {
  const markers = Markers(posts, colors.marker, selectedMarkerSize)

  const markerGroup = useMemo(() => {
    return isClustered ? MarkerCluster(markers, colors.cluster, selectedMarkerClusterSize) : markers
  }, [markers])

  const [geolocationCoordinates, setGeolocationCoordinates] = useState({})

  return (
    <MapContainer doubleClickZoom={false} maxZoom={selectedMaxZoom} scrollWheelZoom={false} zoomControl={false}>
      <ChangeView markers={markers} posts={posts} />

      <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' className="mapTiles" url={selectedMapTiles} />

      <MapControls geolocationCoordinates={geolocationCoordinates} isGeolocated={isGeolocated} setGeolocationCoordinates={setGeolocationCoordinates} />

      {/* Posts markers */}
      {markerGroup}

      {/* Geolocation marker */}
      {isGeolocated && Object.keys(geolocationCoordinates).length && <MarkerGeolocation color={colors.geolocationMarker} coordinates={geolocationCoordinates} />}

      {/* Search marker */}
      {/* {displaySearch && !limitedSearch && Object.keys(selectedSearchResult).length && <MarkerSearch color={colors.search} selectedSearchResult={selectedSearchResult} />} */}
    </MapContainer>
  )
}

export default Map
