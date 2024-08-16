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
  const mapTiles = attributes.mapTiles
  const selectedMapTiles = attributes.selectedMapTiles
  const isClustered = attributes.isClustered
  const isGeolocated = attributes.isGeolocated
  const selectedMarkerColor = attributes.selectedMarkerColor
  const selectedActiveMarkerColor = attributes.selectedActiveMarkerColor
  const selectedClusterColor = attributes.selectedClusterColor
  const selectedSearchColor = attributes.selectedSearchColor
  const selectedGeolocationColor = attributes.selectedGeolocationColor
  const selectedBoundsPadding = attributes.selectedBoundsPadding
  const selectedMaxZoom = attributes.selectedMaxZoom
  const selectedMaxMarkerZoom = attributes.selectedMaxMarkerZoom
  const selectedMarkerSize = attributes.selectedMarkerSize
  const selectedMarkerClusterSize = attributes.selectedMarkerClusterSize

  return (
    <InspectorControls>
      <PanelBody title={__('Render settings', 'maaaps')}>
        <SelectTiles defaultValue={selectedMapTiles} options={mapTiles} setAttributes={setAttributes} />
        <ToggleMarkerCluster defaultValue={isClustered} setAttributes={setAttributes} />
        <ToggleGeolocation defaultValue={isGeolocated} setAttributes={setAttributes} />
        <InputMaxZoom defaultValue={selectedMaxZoom} setAttributes={setAttributes} />
        <InputMaxMarkerZoom defaultValue={selectedMaxMarkerZoom} max={selectedMaxZoom} setAttributes={setAttributes} />
        <InputBoundsPadding defaultValue={selectedBoundsPadding} max={selectedMaxZoom} setAttributes={setAttributes} />
        <UnitMarkerSize defaultValue={selectedMarkerSize} setAttributes={setAttributes} />
        <UnitMarkerClusterSize defaultValue={selectedMarkerClusterSize} setAttributes={setAttributes} />
      </PanelBody>
      <ColorMap
        defaultValues={{
          marker: selectedMarkerColor,
          markerActive: selectedActiveMarkerColor,
          cluster: selectedClusterColor,
          search: selectedSearchColor,
          geolocation: selectedGeolocationColor
        }}
        isClustered={isClustered}
        isGeolocated={isGeolocated}
        setAttributes={setAttributes}
      />
    </InspectorControls>
  )
}
