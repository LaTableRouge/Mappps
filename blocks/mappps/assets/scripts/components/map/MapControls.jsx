import { __ } from '@wordpress/i18n'
import { useMap } from 'react-leaflet'

export default function MapControls({ geolocationCoordinates, isGeolocated, setGeolocationCoordinates, setSelectedPost, setSelectedSearchResult }) {
  const map = useMap()

  return (
    <div className="leaflet-control-container">
      <div className="leaflet-top leaflet-left"></div>
      <div className="leaflet-top leaflet-right">
        <div className="leaflet-control-zoom leaflet-bar leaflet-control">
          <a
            aria-disabled="false"
            aria-label={__('Zoom in', 'mappps')}
            className="leaflet-control-zoom-in"
            href="#"
            role="button"
            title={__('Zoom in', 'mappps')}
            onClick={(e) => {
              e.preventDefault()
              map.zoomIn()
            }}
          >
            <span aria-hidden="true" className="icon-mappps-plus"></span>
          </a>
          <a
            aria-disabled="false"
            aria-label={__('Zoom out', 'mappps')}
            className="leaflet-control-zoom-out"
            href="#"
            role="button"
            title={__('Zoom out', 'mappps')}
            onClick={(e) => {
              e.preventDefault()
              map.zoomOut()
            }}
          >
            <span aria-hidden="true" className="icon-mappps-minus"></span>
          </a>
          <a
            aria-disabled="false"
            aria-label={__('Reset view', 'mappps')}
            className="leaflet-control-reset"
            href="#"
            role="button"
            title={__('Reset view', 'mappps')}
            onClick={(e) => {
              e.preventDefault()
              // Set selected post to trigger the fitbound inside the ChangeView function
              setSelectedPost({})

              // Remove geolocation & searchMarker
              setGeolocationCoordinates({})
              setSelectedSearchResult({})
            }}
          >
            <span aria-hidden="true" className="icon-mappps-refresh"></span>
          </a>
          {isGeolocated && (
            <a
              aria-disabled="false"
              aria-label={__('Find your position', 'mappps')}
              className="leaflet-control-geolocation"
              href="#"
              role="button"
              title={__('Find your position', 'mappps')}
              onClick={(e) => {
                e.preventDefault()
                if (Object.keys(geolocationCoordinates).length) {
                  setGeolocationCoordinates({})
                } else {
                  map.locate().on('locationfound', function (e) {
                    setGeolocationCoordinates(e.latlng)
                  })
                }
              }}
            >
              <span aria-hidden="true" className="icon-mappps-geolocation"></span>
            </a>
          )}
        </div>
      </div>
      <div className="leaflet-bottom leaflet-left"></div>
      <div className="leaflet-bottom leaflet-right"></div>
    </div>
  )
}
