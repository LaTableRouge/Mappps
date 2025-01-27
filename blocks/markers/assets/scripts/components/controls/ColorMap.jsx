import { PanelColorSettings } from '@wordpress/block-editor'
import { __ } from '@wordpress/i18n'

export default function ColorMap({ defaultValues, hasGeolocation, hasSearch, isClustered, setAttributes }) {
  const colorSettings = [
    {
      value: defaultValues.marker,
      label: __('Marker', 'mappps'),
      onChange: (value) => setAttributes({ selectedMarkerColor: value })
    },
    {
      value: defaultValues.markerActive,
      label: __('Selected marker', 'mappps'),
      onChange: (value) => setAttributes({ selectedActiveMarkerColor: value })
    },
    isClustered && {
      value: defaultValues.cluster,
      label: __('Marker cluster', 'mappps'),
      onChange: (value) => setAttributes({ selectedClusterColor: value })
    },
    hasSearch && {
      value: defaultValues.search,
      label: __('Search marker', 'mappps'),
      onChange: (value) => setAttributes({ selectedSearchColor: value })
    },
    hasGeolocation && {
      value: defaultValues.geolocation,
      label: __('Geolocation marker', 'mappps'),
      onChange: (value) => setAttributes({ selectedGeolocationColor: value })
    }
  ].filter(Boolean)

  return <PanelColorSettings colorSettings={colorSettings} title={__('Colors')} />
}
