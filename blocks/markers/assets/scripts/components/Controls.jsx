import { InspectorControls } from '@wordpress/block-editor'
import { PanelBody } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

import ColorMap from './controls/ColorMap'
import MediaIcon from './controls/MediaIcon'
import ToggleIndividualMarkerPictures from './controls/ToggleIndividualMarkerPictures'
import ToggleMarkerCluster from './controls/ToggleMarkerCluster'
import ToggleMarkerShadow from './controls/ToggleMarkerShadow'
import UnitSize from './controls/UnitSize'

export default function Controls({ attributes, hasGeolocation, hasSearch, setAttributes }) {
	const {
		haveShadow,
		isClustered,
		selectedClusterColor,
		selectedClusterTextColor,
		selectedGeolocationColor,
		selectedMarkerClusterIcon,
		selectedMarkerClusterSize,
		selectedMarkerColor,
		selectedMarkerGeolocationIcon,
		selectedMarkerIcon,
		selectedMarkerSearchIcon,
		selectedMarkerSize,
		selectedSearchColor,
		useIndividualMarkerPictures
	} = attributes

	return (
		<InspectorControls>
			<PanelBody title={__('Global settings', 'mappps')}>
				<ToggleMarkerCluster defaultValue={isClustered} setAttributes={setAttributes} />
				<ToggleMarkerShadow defaultValue={haveShadow} setAttributes={setAttributes} />
				<ToggleIndividualMarkerPictures defaultValue={useIndividualMarkerPictures} setAttributes={setAttributes} />
			</PanelBody>

			<PanelBody title={__('Marker settings', 'mappps')}>
				<UnitSize attributeKey={'selectedMarkerSize'} defaultValue={selectedMarkerSize} setAttributes={setAttributes} />
				<MediaIcon attributeKey={'selectedMarkerIcon'} defaultValue={selectedMarkerIcon} setAttributes={setAttributes} />
				{!Object.keys(selectedMarkerIcon).length && (
					<ColorMap settings={[{ value: selectedMarkerColor, label: __('Color', 'mappps'), onChange: (value) => setAttributes({ selectedMarkerColor: value }) }]} />
				)}
			</PanelBody>

			{isClustered && (
				<PanelBody title={__('Marker cluster settings', 'mappps')}>
					<UnitSize attributeKey={'selectedMarkerClusterSize'} defaultValue={selectedMarkerClusterSize} setAttributes={setAttributes} />
					<MediaIcon attributeKey={'selectedMarkerClusterIcon'} defaultValue={selectedMarkerClusterIcon} setAttributes={setAttributes} />
					<ColorMap
						settings={[
							!Object.keys(selectedMarkerClusterIcon).length
								? { value: selectedClusterColor, label: __('Cluster color', 'mappps'), onChange: (value) => setAttributes({ selectedClusterColor: value }) }
								: false,
							{ value: selectedClusterTextColor, label: __('Cluster text color', 'mappps'), onChange: (value) => setAttributes({ selectedClusterTextColor: value }) }
						].filter(Boolean)}
					/>
				</PanelBody>
			)}

			{hasGeolocation && (
				<PanelBody title={__('Marker geolocation settings', 'mappps')}>
					<MediaIcon attributeKey={'selectedMarkerGeolocationIcon'} defaultValue={selectedMarkerGeolocationIcon} setAttributes={setAttributes} />
					{!Object.keys(selectedMarkerGeolocationIcon).length && (
						<ColorMap settings={[{ value: selectedGeolocationColor, label: __('Color', 'mappps'), onChange: (value) => setAttributes({ selectedGeolocationColor: value }) }]} />
					)}
				</PanelBody>
			)}

			{hasSearch && (
				<PanelBody title={__('Marker search settings', 'mappps')}>
					<MediaIcon attributeKey={'selectedMarkerSearchIcon'} defaultValue={selectedMarkerSearchIcon} setAttributes={setAttributes} />
					{!Object.keys(selectedMarkerSearchIcon).length && (
						<ColorMap settings={[{ value: selectedSearchColor, label: __('Color', 'mappps'), onChange: (value) => setAttributes({ selectedSearchColor: value }) }]} />
					)}
				</PanelBody>
			)}
		</InspectorControls>
	)
}
