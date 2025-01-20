import { __ } from '@wordpress/i18n'
import { useMap } from 'react-leaflet'

export default function MapControls({ geolocationCoordinates, isGeolocated, setGeolocationCoordinates, setSelectedPost, setSelectedSearchResult }) {
  const map = useMap()

  const handleZoomIn = (e) => {
    e.preventDefault()
    map.zoomIn()
  }

  const handleZoomOut = (e) => {
    e.preventDefault()
    map.zoomOut()
  }

  const handleReset = (e) => {
    e.preventDefault()
    // Set selected post to trigger the fitbound inside the ChangeView function
    setSelectedPost({})

    // Remove geolocation & searchMarker
    setGeolocationCoordinates({})
    setSelectedSearchResult({})
  }

  const handleGeolocation = (e) => {
    e.preventDefault()
    if (Object.keys(geolocationCoordinates).length) {
      setGeolocationCoordinates({})
    } else {
      map.locate().on('locationfound', (e) => {
        setGeolocationCoordinates(e.latlng)
      })
    }
  }

  return (
    <div className="leaflet-control-container">
      <div className="leaflet-top leaflet-left" />
      <div className="leaflet-top leaflet-right">
        <div className="leaflet-control-zoom leaflet-bar leaflet-control">
          <a
            aria-disabled="false"
            aria-label={__('Zoom in', 'mappps')}
            className="leaflet-control-zoom-in"
            href="#"
            role="button"
            title={__('Zoom in', 'mappps')}
            onClick={handleZoomIn}
          >
            <span aria-hidden="true" className="icon-mappps-plus" />
          </a>
          <a
            aria-disabled="false"
            aria-label={__('Zoom out', 'mappps')}
            className="leaflet-control-zoom-out"
            href="#"
            role="button"
            title={__('Zoom out', 'mappps')}
            onClick={handleZoomOut}
          >
            <span aria-hidden="true" className="icon-mappps-minus" />
          </a>
          <a
            aria-disabled="false"
            aria-label={__('Reset view', 'mappps')}
            className="leaflet-control-reset"
            href="#"
            role="button"
            title={__('Reset view', 'mappps')}
            onClick={handleReset}
          >
            <span aria-hidden="true" className="icon-mappps-refresh" />
          </a>
          {isGeolocated && (
            <a
              aria-disabled="false"
              aria-label={__('Find your position', 'mappps')}
              className="leaflet-control-geolocation"
              href="#"
              role="button"
              title={__('Find your position', 'mappps')}
              onClick={handleGeolocation}
            >
              <span aria-hidden="true" className="icon-mappps-geolocation" />
            </a>
          )}
        </div>
      </div>
      <div className="leaflet-bottom leaflet-left" />
      <div className="leaflet-bottom leaflet-right" />
    </div>
  )
}
