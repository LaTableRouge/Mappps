import { InspectorControls } from '@wordpress/block-editor'
import { PanelBody } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

import ColorMap from './controls/ColorMap'
import InputMaxZoom from './controls/NumberMaxZoom'
import SelectTiles from './controls/SelectTiles'
import ToggleGeolocation from './controls/ToggleGeolocation'
import ToggleMarkerCluster from './controls/ToggleMarkerCluster'
import UnitMarkerClusterSize from './controls/UnitMarkerClusterSize'
import UnitMarkerSize from './controls/UnitMarkerSize'

export default function Controls({
  attributes,
  colors,
  isClustered,
  isGeolocated,
  mapTiles,
  selectedMapTiles,
  selectedMarkerClusterSize,
  selectedMarkerSize,
  selectedMaxZoom,
  setAttributes
}) {
  // const displaySearch = attributes.displaySearch
  // const limitedSearch = attributes.limitedSearch

  return (
    <InspectorControls>
      <PanelBody initialOpen={false} title={__('Render settings', 'maaaps')}>
        <SelectTiles defaultValue={selectedMapTiles} options={mapTiles} setAttributes={setAttributes} />
        <ToggleMarkerCluster defaultValue={isClustered} setAttributes={setAttributes} />
        <ToggleGeolocation defaultValue={isGeolocated} setAttributes={setAttributes} />
        <InputMaxZoom defaultValue={selectedMaxZoom} setAttributes={setAttributes} />
        <UnitMarkerSize defaultValue={selectedMarkerSize} setAttributes={setAttributes} />
        <UnitMarkerClusterSize defaultValue={selectedMarkerClusterSize} setAttributes={setAttributes} />
      </PanelBody>
      <ColorMap defaultValues={colors} hasSearchColor={true} isClustered={isClustered} setAttributes={setAttributes} />
    </InspectorControls>
  )
}
