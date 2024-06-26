import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet/dist/leaflet.css'
import '@changey/react-leaflet-markercluster/dist/styles.min.css'
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css'

import MarkerClusterGroup from '@changey/react-leaflet-markercluster'
import { useMemo } from '@wordpress/element'
import { MapContainer, TileLayer } from 'react-leaflet'

import ChangeView from '../utils/ChangeView'
import Markers from './map/Markers'

const Map = ({ posts, selectedPosts, tiles }) => {
  posts = posts.filter((post) => selectedPosts.includes(`${post.id}`))
  const markers = Markers(posts)

  const markerGroup = useMemo(() => {
    return <MarkerClusterGroup>{markers}</MarkerClusterGroup>
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
