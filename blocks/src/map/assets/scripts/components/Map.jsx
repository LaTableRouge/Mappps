import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet/dist/leaflet.css'
import '@changey/react-leaflet-markercluster/dist/styles.min.css'
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css'

import { useEffect, useMemo, useRef, useState } from '@wordpress/element'
import { MapContainer, TileLayer } from 'react-leaflet'

// import ChangeView from '../utils/ChangeView'
import MapControls from './map/MapControls'
// import MarkerCluster from './map/MarkerCluster'
import MarkerGeolocation from './map/MarkerGeolocation'
import Markers from './map/Markers'

// import MarkerSearch from './map/MarkerSearch'

const Map = ({ boundsPadding, cluster, clusterSize, isGeolocated, markerSize, maxMarkerZoom, maxZoom, queriedPosts, selectedPost, tiles }) => {
  const [posts, setPosts] = useState(queriedPosts)
  // const [markers, setMarkers] = useState(Markers(posts, markerSize))

  useEffect(() => {
    function handlekeydownEvent(e) {
      const detail = e.detail
      setPosts(detail.posts)
      // setMarkers(Markers(posts, markerSize))
    }

    document.addEventListener('mps-posts-change', handlekeydownEvent)
    return () => {
      document.removeEventListener('mps-posts-change', handlekeydownEvent)
    }
  }, [])

  const markers = Markers(posts, markerSize)

  // const clusterRef = useRef(null)

  // const markerGroup = useMemo(() => {
  //   return cluster ? MarkerCluster(markers, clusterSize, clusterRef) : markers
  // }, [markers])

  const refMarkerGeolocation = useRef(null)
  const [geolocationCoordinates, setGeolocationCoordinates] = useState({})
  const markerGeolocationMemo = useMemo(() => {
    if (isGeolocated && Object.keys(geolocationCoordinates).length) {
      return MarkerGeolocation(geolocationCoordinates, refMarkerGeolocation)
    } else {
      return null
    }
  }, [geolocationCoordinates])

  // const refMarkerSearch = useRef(null)
  // const markerSearchMemo = useMemo(() => {
  //   if (displaySearch && !limitedSearch && Object.keys(selectedSearchResult).length) {
  //     return MarkerSearch(selectedSearchResult, refMarkerSearch)
  //   } else {
  //     return null
  //   }
  // }, [selectedSearchResult])

  return (
    <MapContainer
      center={[51.505, -0.09]}
      doubleClickZoom={false}
      maxZoom={maxZoom}
      scrollWheelZoom={false}
      style={{ width: '100%', height: '500px' }}
      zoom={13}
      zoomControl={false}
      zoomSnap={0.1}
    >
      {/* <ChangeView
        boundsPadding={boundsPadding}
        markerGeolocation={markerGeolocationMemo}
        markerOffset={markerOffset}
        markers={markers}
        maxMarkerZoom={maxMarkerZoom}
        posts={posts}
        refCluster={clusterRef}
        refMarkerGeolocation={refMarkerGeolocation}
      /> */}

      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        className="mapTiles"
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />

      <MapControls geolocationCoordinates={geolocationCoordinates} isGeolocated={isGeolocated} setGeolocationCoordinates={setGeolocationCoordinates} />

      {/* Posts markers */}
      {markers}

      {/* Geolocation marker */}
      {markerGeolocationMemo}

      {/* Search marker */}
      {/* {markerSearchMemo} */}
    </MapContainer>
  )
}

export default Map
