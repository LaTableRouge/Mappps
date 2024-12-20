import { PanelColorSettings } from '@wordpress/block-editor'
import { __ } from '@wordpress/i18n'

export default function ColorMap({ defaultValues, hasSearchColor, isClustered, isGeolocated, setAttributes }) {
  const colorSettings = [
    {
      value: defaultValues.marker,
      label: __('Map marker'),
      onChange: (value) => setAttributes({ selectedMarkerColor: value })
    },
    {
      value: defaultValues.markerActive,
      label: __('Map selected marker'),
      onChange: (value) => setAttributes({ selectedActiveMarkerColor: value })
    },
    isClustered && {
      value: defaultValues.cluster,
      label: __('Map marker cluster'),
      onChange: (value) => setAttributes({ selectedClusterColor: value })
    },
    hasSearchColor && {
      value: defaultValues.search,
      label: __('Map search marker'),
      onChange: (value) => setAttributes({ selectedSearchColor: value })
    },
    isGeolocated && {
      value: defaultValues.geolocation,
      label: __('Map geolocation marker'),
      onChange: (value) => setAttributes({ selectedGeolocationColor: value })
    }
  ].filter(Boolean)

  return <PanelColorSettings colorSettings={colorSettings} title={__('Colors')} />
}
