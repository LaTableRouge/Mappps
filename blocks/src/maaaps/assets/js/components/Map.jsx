import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js'
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css'
import 'leaflet/dist/leaflet.css'
import 'react-leaflet-markercluster/dist/styles.min.css' // sass
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css'

import { MapContainer, TileLayer } from 'react-leaflet'

import Markers from './Markers'

// import ComponentList from "../config/ComponentList";

// require('react-leaflet-markercluster/dist/styles.min.css') // inside .js file

const Map = ({ posts, selectedPosts }) => {
  const position = [51.505, -0.09]

  posts = posts.filter((post) => selectedPosts.includes(`${post.id}`))
  const markers = Markers(posts)

  return (
    <>
      <MapContainer className="maaaps__leaflet" center={position} zoom="13" scrollWheelZoom={false}>
        {/* <ChangeView markers={markers} posts={posts} /> */}
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          className="mapTiles"
        />
        {markers}
      </MapContainer>
    </>
  )
}

export default Map
