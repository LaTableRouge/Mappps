import { __ } from '@wordpress/i18n'

export default function Controls({ attributes, setAttributes }) {
	const { canZoomToMarker, isGeolocated, mapTiles, selectedBoundsPadding, selectedMapTiles, selectedMaxMarkerZoom, selectedMaxZoom } = attributes

	return (
		<InspectorControls>
			<PanelBody title={__('Render settings', 'mappps')}>
				<SelectTiles defaultValue={selectedMapTiles} options={mapTiles} setAttributes={setAttributes} />
				<ToggleMarkerZoom defaultValue={canZoomToMarker} setAttributes={setAttributes} />
				<ToggleGeolocation defaultValue={isGeolocated} setAttributes={setAttributes} />
				<InputMaxZoom defaultValue={selectedMaxZoom} max={mapTiles.find(({ value }) => value === selectedMapTiles).maxZoom} setAttributes={setAttributes} />
				<InputMaxMarkerZoom defaultValue={selectedMaxMarkerZoom} max={selectedMaxZoom} setAttributes={setAttributes} />
				<InputBoundsPadding defaultValue={selectedBoundsPadding} max={selectedMaxZoom} setAttributes={setAttributes} />
			</PanelBody>
		</InspectorControls>
	)
}
