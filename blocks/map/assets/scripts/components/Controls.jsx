import { InspectorControls } from '@wordpress/block-editor'
import { PanelBody } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

import InputBoundsPadding from './controls/NumberBoundsPadding'
import InputMaxMarkerZoom from './controls/NumberMaxMarkerZoom'
import InputMaxZoom from './controls/NumberMaxZoom'
import SelectTiles from './controls/SelectTiles'
import ToggleGeolocation from './controls/ToggleGeolocation'
import ToggleMarkerZoom from './controls/ToggleMarkerZoom'

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
