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

const Map = ({ cluster, clusterSize, colors, displaySearch, isGeolocated, limitedSearch, markerSize, maxZoom, posts, selectedPost, selectedSearchResult, tiles }) => {
  const markers = Markers(posts, colors.marker, markerSize)

  const markerGroup = useMemo(() => {
    return cluster ? MarkerCluster(markers, colors.cluster, clusterSize) : markers
  }, [markers])

  const [geolocationCoordinates, setGeolocationCoordinates] = useState({})

  return (
    <MapContainer className="maaaps__leaflet" doubleClickZoom={false} maxZoom={maxZoom} scrollWheelZoom={false} zoomControl={false}>
      <ChangeView markers={markers} posts={posts} selectedPost={selectedPost} />

      <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' className="mapTiles" url={tiles} />

      <MapControls geolocationCoordinates={geolocationCoordinates} isGeolocated={isGeolocated} setGeolocationCoordinates={setGeolocationCoordinates} />

      {/* Posts markers */}
      {markerGroup}

      {/* Geolocation marker */}
      {isGeolocated && Object.keys(geolocationCoordinates).length && <MarkerGeolocation color={colors.geolocationMarker} coordinates={geolocationCoordinates} />}

      {/* Search marker */}
      {displaySearch && !limitedSearch && Object.keys(selectedSearchResult).length && <MarkerSearch color={colors.search} selectedSearchResult={selectedSearchResult} />}
    </MapContainer>
  )
}

export default Map
