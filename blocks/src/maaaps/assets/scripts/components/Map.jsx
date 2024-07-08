import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet/dist/leaflet.css'
import '@changey/react-leaflet-markercluster/dist/styles.min.css'
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css'

import { useMemo, useRef, useState } from '@wordpress/element'
import { MapContainer, TileLayer } from 'react-leaflet'

import ChangeView from '../utils/ChangeView'
import MapControls from './map/MapControls'
import MarkerCluster from './map/MarkerCluster'
import MarkerGeolocation from './map/MarkerGeolocation'
import Markers from './map/Markers'
import MarkerSearch from './map/MarkerSearch'

const Map = ({
  articleRefs,
  cluster,
  clusterSize,
  colors,
  displaySearch,
  isGeolocated,
  limitedSearch,
  markerRefs,
  markerSize,
  maxMarkerZoom,
  maxZoom,
  mobileIsMapDisplayed,
  posts,
  selectedPost,
  selectedSearchResult,
  setSelectedPost,
  tiles
}) => {
  const clusterRef = useRef(null)

  const markers = Markers(posts, colors.marker, markerSize, markerRefs)

  const markerGroup = useMemo(() => {
    return cluster ? MarkerCluster(markers, colors.cluster, clusterSize, clusterRef) : markers
  }, [markers])

  const [geolocationCoordinates, setGeolocationCoordinates] = useState({})
  const markerGeolocationMemo = useMemo(() => {
    if (isGeolocated && Object.keys(geolocationCoordinates).length) {
      return MarkerGeolocation(colors.geolocationMarker, geolocationCoordinates)
    } else {
      return null
    }
  }, [geolocationCoordinates])

  const refMarkerSearch = useRef(null)
  const markerSearchMemo = useMemo(() => {
    if (displaySearch && !limitedSearch && Object.keys(selectedSearchResult).length) {
      return MarkerSearch(colors.search, selectedSearchResult, refMarkerSearch)
    } else {
      return null
    }
  }, [selectedSearchResult])

  return (
    <div className="maaaps__leaflet" data-map-shown={mobileIsMapDisplayed}>
      <MapContainer doubleClickZoom={false} maxZoom={maxZoom} scrollWheelZoom={false} zoomControl={false}>
        <ChangeView
          markerGeolocation={markerGeolocationMemo}
          markers={markers}
          markerSearch={markerSearchMemo}
          maxMarkerZoom={maxMarkerZoom}
          posts={posts}
          refCluster={clusterRef}
          refMarkerSearch={refMarkerSearch}
          refsMarker={markerRefs}
          selectedPost={selectedPost}
        />

        <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' className="mapTiles" url={tiles} />

        <MapControls
          geolocationCoordinates={geolocationCoordinates}
          isGeolocated={isGeolocated}
          setGeolocationCoordinates={setGeolocationCoordinates}
          setSelectedPost={setSelectedPost}
        />

        {/* Posts markers */}
        {markerGroup}

        {/* Geolocation marker */}
        {markerGeolocationMemo}
        {/* {isGeolocated && Object.keys(geolocationCoordinates).length && <MarkerGeolocation color={colors.geolocationMarker} coordinates={geolocationCoordinates} />} */}

        {/* Search marker */}
        {markerSearchMemo}
        {/* {displaySearch && !limitedSearch && Object.keys(selectedSearchResult).length && <MarkerSearch color={colors.search} selectedSearchResult={selectedSearchResult} />} */}
      </MapContainer>
    </div>
  )
}

export default Map
