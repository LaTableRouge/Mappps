import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js'
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css'
import 'leaflet/dist/leaflet.css'
import 'react-leaflet-markercluster/dist/styles.min.css' // sass
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css'

import { MapContainer, TileLayer } from 'react-leaflet'

// import ComponentList from "../config/ComponentList";

// import ChangeView from "../utils/ChangeView";

require('react-leaflet-markercluster/dist/styles.min.css') // inside .js file

const Map = ({ data, selectedInstitution, setSelectedInstitution, client, filtersKeys, filters }) => {
  return (
    <>
      <MapContainer className="maaaps__leaflet" center={[43.57, 4.5]} zoom="30" scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          className="mapTiles"
        />
      </MapContainer>
    </>
  )
}

export default Map
