import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet/dist/leaflet.css'
import '@changey/react-leaflet-markercluster/dist/styles.min.css'
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css'

import { useMemo } from '@wordpress/element'
import { MapContainer, TileLayer } from 'react-leaflet'

import ChangeView from '../utils/ChangeView'
import MarkerCluster from './map/MarkerCluster'
import Markers from './map/Markers'

const Map = ({ posts, tiles, cluster, geolocation, colors }) => {
  const markers = Markers(posts, colors.marker)

  const markerGroup = useMemo(() => {
    return cluster ? MarkerCluster(markers, colors.cluster) : markers
  }, [markers])

  return (
    <MapContainer
      className="maaaps__leaflet"
      // center={[51.505, -0.09]}
      // zoom="13"
      scrollWheelZoom={false}
    >
      <ChangeView markers={markers} posts={posts} />
      <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url={tiles} className="mapTiles" />
      {markerGroup}
    </MapContainer>
  )
}

export default Map
