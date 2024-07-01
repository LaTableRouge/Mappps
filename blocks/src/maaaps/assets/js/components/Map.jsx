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
import MarkerSearch from './map/MarkerSearch'

const Map = ({ posts, tiles, cluster, isGeolocated, colors, selectedSearchResult, displaySearch, limitedSearch, selectedPost }) => {
  const markers = Markers(posts, colors.marker)

  const markerGroup = useMemo(() => {
    return cluster ? MarkerCluster(markers, colors.cluster) : markers
  }, [markers])

  const [geolocationCoordinates, setGeolocationCoordinates] = useState({})

  return (
    <MapContainer className="maaaps__leaflet" scrollWheelZoom={false} zoomControl={false}>
      <ChangeView markers={markers} posts={posts} selectedPost={selectedPost} />

      <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url={tiles} className="mapTiles" />

      <MapControls setGeolocationCoordinates={setGeolocationCoordinates} geolocationCoordinates={geolocationCoordinates} />

      {/* Posts markers */}
      {markerGroup}

      {/* Geolocation marker */}
      {isGeolocated && Object.keys(geolocationCoordinates).length && <MarkerGeolocation coordinates={geolocationCoordinates} color={colors.geolocationMarker} />}

      {/* Search marker */}
      {displaySearch && !limitedSearch && Object.keys(selectedSearchResult).length && <MarkerSearch selectedSearchResult={selectedSearchResult} color={colors.search} />}
    </MapContainer>
  )
}

export default Map
