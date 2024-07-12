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
            aria-label={__('Zoom in', 'maaaps')}
            className="leaflet-control-zoom-in"
            href="#"
            role="button"
            title={__('Zoom in', 'maaaps')}
            onClick={(e) => {
              e.preventDefault()
              map.zoomIn()
            }}
          >
            <span aria-hidden="true" className="icon-maaaps-plus"></span>
          </a>
          <a
            aria-disabled="false"
            aria-label={__('Zoom out', 'maaaps')}
            className="leaflet-control-zoom-out"
            href="#"
            role="button"
            title={__('Zoom out', 'maaaps')}
            onClick={(e) => {
              e.preventDefault()
              map.zoomOut()
            }}
          >
            <span aria-hidden="true" className="icon-maaaps-minus"></span>
          </a>
          <a
            aria-disabled="false"
            aria-label={__('Reset view', 'maaaps')}
            className="leaflet-control-reset"
            href="#"
            role="button"
            title={__('Reset view', 'maaaps')}
            onClick={(e) => {
              e.preventDefault()
              // Set selected post to trigger the fitbound inside the ChangeView function
              setSelectedPost({})

              // Remove geolocation & searchMarker
              setGeolocationCoordinates({})
              setSelectedSearchResult({})
            }}
          >
            <span aria-hidden="true" className="icon-maaaps-refresh"></span>
          </a>
          {isGeolocated && (
            <a
              aria-disabled="false"
              aria-label={__('Find your position', 'maaaps')}
              className="leaflet-control-geolocation"
              href="#"
              role="button"
              title={__('Find your position', 'maaaps')}
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
              <span aria-hidden="true" className="icon-maaaps-geolocation"></span>
            </a>
          )}
        </div>
      </div>
      <div className="leaflet-bottom leaflet-left"></div>
      <div className="leaflet-bottom leaflet-right"></div>
    </div>
  )
}
