import { InspectorControls } from '@wordpress/block-editor'
import { PanelBody } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

import ColorMap from './controls/ColorMap'
import InputBoundsPadding from './controls/NumberBoundsPadding'
import InputMaxMarkerZoom from './controls/NumberMaxMarkerZoom'
import InputMaxZoom from './controls/NumberMaxZoom'
import SelectTiles from './controls/SelectTiles'
import ToggleGeolocation from './controls/ToggleGeolocation'
import ToggleMarkerCluster from './controls/ToggleMarkerCluster'
import UnitMarkerClusterSize from './controls/UnitMarkerClusterSize'
import UnitMarkerSize from './controls/UnitMarkerSize'

export default function Controls({ attributes, setAttributes }) {
  const {
    isClustered,
    isGeolocated,
    mapTiles,
    selectedActiveMarkerColor,
    selectedBoundsPadding,
    selectedClusterColor,
    selectedGeolocationColor,
    selectedMapTiles,
    selectedMarkerClusterSize,
    selectedMarkerColor,
    selectedMarkerSize,
    selectedMaxMarkerZoom,
    selectedMaxZoom,
    selectedSearchColor
  } = attributes

  const colorValues = {
    marker: selectedMarkerColor,
    markerActive: selectedActiveMarkerColor,
    cluster: selectedClusterColor,
    search: selectedSearchColor,
    geolocation: selectedGeolocationColor
  }

  return (
    <InspectorControls>
      <PanelBody title={__('Render settings', 'mappps')}>
        <SelectTiles defaultValue={selectedMapTiles} options={mapTiles} setAttributes={setAttributes} />
        <ToggleMarkerCluster defaultValue={isClustered} setAttributes={setAttributes} />
        <ToggleGeolocation defaultValue={isGeolocated} setAttributes={setAttributes} />
        <InputMaxZoom defaultValue={selectedMaxZoom} max={mapTiles.find(({ value }) => value === selectedMapTiles).maxZoom} setAttributes={setAttributes} />
        <InputMaxMarkerZoom defaultValue={selectedMaxMarkerZoom} max={selectedMaxZoom} setAttributes={setAttributes} />
        <InputBoundsPadding defaultValue={selectedBoundsPadding} max={selectedMaxZoom} setAttributes={setAttributes} />
        <UnitMarkerSize defaultValue={selectedMarkerSize} setAttributes={setAttributes} />
        <UnitMarkerClusterSize defaultValue={selectedMarkerClusterSize} setAttributes={setAttributes} />
      </PanelBody>
      <ColorMap defaultValues={colorValues} isClustered={isClustered} isGeolocated={isGeolocated} setAttributes={setAttributes} />
    </InspectorControls>
  )
}
