import { __ } from '@wordpress/i18n'
import { useMap } from 'react-leaflet'

export default function MapControls({ setGeolocationCoordinates, geolocationCoordinates }) {
  const map = useMap()

  return (
    <div className="leaflet-control-container">
      <div className="leaflet-top leaflet-left"></div>
      <div className="leaflet-top leaflet-right">
        <div className="leaflet-control-zoom leaflet-bar leaflet-control">
          <a
            className="leaflet-control-zoom-in"
            href="#"
            title={__('Zoom in', 'maaaps')}
            role="button"
            aria-label={__('Zoom in', 'maaaps')}
            aria-disabled="false"
            onClick={(e) => {
              e.preventDefault()
              map.zoomIn()
            }}
          >
            <span aria-hidden="true">+</span>
          </a>
          <a
            className="leaflet-control-zoom-out"
            href="#"
            title={__('Zoom out', 'maaaps')}
            role="button"
            aria-label={__('Zoom out', 'maaaps')}
            aria-disabled="false"
            onClick={(e) => {
              e.preventDefault()
              map.zoomOut()
            }}
          >
            <span aria-hidden="true">-</span>
          </a>
          <a
            className="leaflet-control-geolocation"
            href="#"
            title={__('Find your position', 'maaaps')}
            role="button"
            aria-label={__('Find your position', 'maaaps')}
            aria-disabled="false"
            onClick={(e) => {
              e.preventDefault()
              if (Object.keys(geolocationCoordinates).length) {
                setGeolocationCoordinates({})
              } else {
                map.locate().on('locationfound', function (e) {
                  map.flyTo(e.latlng, map.getZoom())
                  setGeolocationCoordinates(e.latlng)
                })
              }
            }}
          >
            <span aria-hidden="true">-</span>
          </a>
        </div>
      </div>
      <div className="leaflet-bottom leaflet-left"></div>
      <div className="leaflet-bottom leaflet-right"></div>
    </div>
  )
}
