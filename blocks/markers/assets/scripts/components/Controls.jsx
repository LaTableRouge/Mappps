import { InspectorControls } from '@wordpress/block-editor'
import { PanelBody } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

import ColorMap from './controls/ColorMap'
import ToggleMarkerCluster from './controls/ToggleMarkerCluster'
import ToggleMarkerShadow from './controls/ToggleMarkerShadow'
import UnitMarkerClusterSize from './controls/UnitMarkerClusterSize'
import UnitMarkerSize from './controls/UnitMarkerSize'

export default function Controls({ attributes, hasGeolocation, hasSearch, setAttributes }) {
  const {
    haveShadow,
    isClustered,
    selectedActiveMarkerColor,
    selectedClusterColor,
    selectedGeolocationColor,
    selectedMarkerClusterSize,
    selectedMarkerColor,
    selectedMarkerSize,
    selectedSearchColor
  } = attributes

  const colorValues = {
    marker: selectedMarkerColor,
    markerActive: selectedActiveMarkerColor,
    cluster: selectedClusterColor,
    geolocation: selectedGeolocationColor
  }

  if (hasSearch) {
    colorValues.search = selectedSearchColor
  }

  return (
    <InspectorControls>
      <PanelBody title={__('Render settings', 'mappps')}>
        <ToggleMarkerCluster defaultValue={isClustered} setAttributes={setAttributes} />
        <ToggleMarkerShadow defaultValue={haveShadow} setAttributes={setAttributes} />
        <UnitMarkerSize defaultValue={selectedMarkerSize} setAttributes={setAttributes} />
        <UnitMarkerClusterSize defaultValue={selectedMarkerClusterSize} setAttributes={setAttributes} />
      </PanelBody>
      <ColorMap defaultValues={colorValues} hasGeolocation={hasGeolocation} hasSearch={hasSearch} isClustered={isClustered} setAttributes={setAttributes} />
    </InspectorControls>
  )
}
