import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet/dist/leaflet.css'
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css'
import '../../../../../src/helpers/scripts/leaflet.markercluster/dist/MarkerCluster.css'

import { createRef, useMemo, useRef, useState } from '@wordpress/element'
import { MapContainer } from 'react-leaflet'

import ChangeView from '../utils/ChangeView'
import MapControls from './map/MapControls'
import MarkerCluster from './map/MarkerCluster'
import MarkerGeolocation from './map/MarkerGeolocation'
import Markers from './map/Markers'
import MarkerSearch from './map/MarkerSearch'
import Tiles from './map/Tiles'

const MAP_DEFAULTS = {
  doubleClickZoom: false,
  scrollWheelZoom: false,
  zoomControl: false,
  zoomSnap: 0.1
}

export default function Map({
  boundsPadding,
  canZoomToMarker,
  cluster,
  clusterSize,
  inEditor,
  isGeolocated,
  isMobileView,
  mapTiles,
  markerOffset = 0,
  markerShadow,
  markerSize,
  maxMarkerZoom,
  maxZoom,
  posts,
  selectedPost,
  selectedSearchResult,
  selectedTiles,
  setSelectedPost,
  setSelectedSearchResult
}) {
  const clusterRef = useRef(null)
  const markerRefs = useRef([])
  markerRefs.current = posts.map((_, i) => markerRefs.current[i] ?? createRef())

  const markers = Markers(posts, markerRefs, markerSize, selectedPost, setSelectedPost, markerShadow)
  const markerGroup = useMemo(() => {
    return cluster ? MarkerCluster(markers, clusterSize, clusterRef, markerShadow, canZoomToMarker) : markers
  }, [cluster, clusterSize, markers])

  const refMarkerGeolocation = useRef(null)
  const [geolocationCoordinates, setGeolocationCoordinates] = useState({})
  const markerGeolocationMemo = useMemo(() => {
    if (isGeolocated && Object.keys(geolocationCoordinates).length) {
      return MarkerGeolocation(geolocationCoordinates, refMarkerGeolocation, markerShadow)
    }
    return null
  }, [geolocationCoordinates, isGeolocated])

  const refMarkerSearch = useRef(null)
  const markerSearchMemo = useMemo(() => {
    if (Object.keys(selectedSearchResult).length) {
      return MarkerSearch(selectedSearchResult, refMarkerSearch, markerShadow)
    }
    return null
  }, [selectedSearchResult])

  return (
    <MapContainer {...MAP_DEFAULTS} maxZoom={maxZoom}>
      <ChangeView
        boundsPadding={boundsPadding}
        canZoomToMarker={canZoomToMarker}
        isMobileView={isMobileView}
        markerGeolocation={markerGeolocationMemo}
        markerOffset={markerOffset}
        markers={markers}
        markerSearch={markerSearchMemo}
        maxMarkerZoom={maxMarkerZoom}
        posts={posts}
        refCluster={clusterRef}
        refMarkerGeolocation={refMarkerGeolocation}
        refMarkerSearch={refMarkerSearch}
        refsMarker={markerRefs}
        selectedPost={selectedPost}
      />

      <Tiles inEditor={inEditor} mapTiles={mapTiles} selectedTiles={selectedTiles} />

      <MapControls
        geolocationCoordinates={geolocationCoordinates}
        isGeolocated={isGeolocated}
        setGeolocationCoordinates={setGeolocationCoordinates}
        setSelectedPost={setSelectedPost}
        setSelectedSearchResult={setSelectedSearchResult}
      />

      {markerGroup}
      {markerGeolocationMemo}
      {markerSearchMemo}
    </MapContainer>
  )
}
