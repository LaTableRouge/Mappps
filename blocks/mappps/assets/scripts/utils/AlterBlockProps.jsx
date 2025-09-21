import { isColorLight } from '../common/functions'

export default function AlterBlockProps(blockProps = {}, attributes) {
	blockProps.style = {
		...blockProps.style,
		'--marker-size': attributes.selectedMarkerSize,
		'--cluster-size': attributes.selectedMarkerClusterSize,
		'--color-primary': attributes.selectedPrimaryColor,
		'--color-secondary': attributes.selectedSecondaryColor,
		'--color-marker': attributes.selectedMarkerColor,
		'--color-marker-active': attributes.selectedActiveMarkerColor,
		'--color-cluster': attributes.selectedClusterColor,
		'--color-marker-search': attributes.selectedSearchColor,
		'--color-marker-geolocation': attributes.selectedGeolocationColor,
		'--sidebar-size': attributes.selectedSidebarSize,
		'--popup-size': attributes.selectedPopupsSize,
		'--filter-size': attributes.selectedFiltersSize,
		'--color-button-primary': isColorLight(attributes.selectedPrimaryColor, 170) === 'light' ? 'var(--color-gray-700)' : 'var(--color-white)',
		'--color-button-secondary': isColorLight(attributes.selectedSecondaryColor, 170) === 'light' ? 'var(--color-gray-700)' : 'var(--color-white)'
	}
	if (blockProps.style.aspectRatio) {
		if (blockProps.style.aspectRatio !== 'auto') {
			blockProps.style['--aspect-ratio'] = blockProps.style.aspectRatio
		}
		delete blockProps.style.aspectRatio
	}

	return blockProps
}
