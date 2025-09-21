import { __ } from '@wordpress/i18n'

export default function ColorMap({ defaultValues, hasCustomClusterMarker, hasCustomGeolocationMarker, hasCustomMarker, hasCustomSearchMarker, hasGeolocation, hasSearch, isClustered, setAttributes }) {
	const colorSettings = [
		!hasCustomMarker && {
			value: defaultValues.marker,
			label: __('Marker', 'mappps'),
			onChange: (value) => setAttributes({ selectedMarkerColor: value })
		},
		!hasCustomMarker && {
			value: defaultValues.markerActive,
			label: __('Selected marker', 'mappps'),
			onChange: (value) => setAttributes({ selectedActiveMarkerColor: value })
		},
		!hasCustomClusterMarker
			&& isClustered && {
				value: defaultValues.cluster,
				label: __('Marker cluster', 'mappps'),
				onChange: (value) => setAttributes({ selectedClusterColor: value })
			},
		!hasCustomSearchMarker
			&& hasSearch && {
				value: defaultValues.search,
				label: __('Search marker', 'mappps'),
				onChange: (value) => setAttributes({ selectedSearchColor: value })
			},
		!hasCustomGeolocationMarker
			&& hasGeolocation && {
				value: defaultValues.geolocation,
				label: __('Geolocation marker', 'mappps'),
				onChange: (value) => setAttributes({ selectedGeolocationColor: value })
			}
	].filter(Boolean)

	return <PanelColorSettings colorSettings={colorSettings} title={__('Colors')} />
}
