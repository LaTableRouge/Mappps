import { InspectorControls } from '@wordpress/block-editor'
import { PanelBody } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

import ColorMap from './controls/ColorMap'
import MediaMarkerClusterIcon from './controls/MediaMarkerClusterIcon'
import MediaMarkerGeolocationIcon from './controls/MediaMarkerGeolocationIcon'
import MediaMarkerIcon from './controls/MediaMarkerIcon'
import MediaMarkerSearchIcon from './controls/MediaMarkerSearchIcon'
import ToggleCustomMarkers from './controls/ToggleCustomMarkers'
import ToggleMarkerCluster from './controls/ToggleMarkerCluster'
import ToggleMarkerShadow from './controls/ToggleMarkerShadow'
import UnitMarkerClusterSize from './controls/UnitMarkerClusterSize'
import UnitMarkerSize from './controls/UnitMarkerSize'

export default function Controls({ attributes, hasGeolocation, hasSearch, setAttributes }) {
  const {
    haveCustomMarkers,
    haveShadow,
    isClustered,
    selectedActiveMarkerColor,
    selectedClusterColor,
    selectedGeolocationColor,
    selectedMarkerClusterIcon,
    selectedMarkerClusterSize,
    selectedMarkerColor,
    selectedMarkerGeolocationIcon,
    selectedMarkerIcon,
    selectedMarkerSearchIcon,
    selectedMarkerSize,
    selectedSearchColor
  } = attributes

  const colorValues = {
    marker: selectedMarkerColor,
    markerActive: selectedActiveMarkerColor,
    cluster: selectedClusterColor,
    geolocation: selectedGeolocationColor,
    search: selectedSearchColor
  }

  return (
    <InspectorControls>
      <PanelBody title={__('Render settings', 'mappps')}>
        <ToggleMarkerCluster defaultValue={isClustered} setAttributes={setAttributes} />
        <ToggleMarkerShadow defaultValue={haveShadow} setAttributes={setAttributes} />
        <UnitMarkerSize defaultValue={selectedMarkerSize} setAttributes={setAttributes} />
        <UnitMarkerClusterSize defaultValue={selectedMarkerClusterSize} setAttributes={setAttributes} />
      </PanelBody>

      <PanelBody title={__('Icons settings', 'mappps')}>
        <ToggleCustomMarkers defaultValue={haveCustomMarkers} setAttributes={setAttributes} />
        {haveCustomMarkers && (
          <>
            <MediaMarkerIcon defaultValue={selectedMarkerIcon} setAttributes={setAttributes} />
            {isClustered && <MediaMarkerClusterIcon defaultValue={selectedMarkerClusterIcon} setAttributes={setAttributes} />}
            {hasGeolocation && <MediaMarkerGeolocationIcon defaultValue={selectedMarkerGeolocationIcon} setAttributes={setAttributes} />}
            {hasSearch && <MediaMarkerSearchIcon defaultValue={selectedMarkerSearchIcon} setAttributes={setAttributes} />}
          </>
        )}
      </PanelBody>

      <ColorMap
        defaultValues={colorValues}
        hasCustomClusterMarker={Object.keys(selectedMarkerClusterIcon).length}
        hasCustomGeolocationMarker={Object.keys(selectedMarkerGeolocationIcon).length}
        hasCustomMarker={Object.keys(selectedMarkerIcon).length}
        hasCustomSearchMarker={Object.keys(selectedMarkerSearchIcon).length}
        hasGeolocation={hasGeolocation}
        hasSearch={hasSearch}
        isClustered={isClustered}
        setAttributes={setAttributes}
      />
    </InspectorControls>
  )
}
