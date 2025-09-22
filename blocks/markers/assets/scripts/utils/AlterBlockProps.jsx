export default function AlterBlockProps(blockProps = {}, attributes) {
	const { selectedActiveMarkerColor, selectedClusterColor, selectedGeolocationColor, selectedMarkerClusterSize, selectedMarkerColor, selectedMarkerSize, selectedSearchColor }
		= attributes

	return {
		...blockProps,
		style: {
			...blockProps.style,
			'--marker-size': selectedMarkerSize,
			'--cluster-size': selectedMarkerClusterSize,
			'--color-marker': selectedMarkerColor,
			'--color-marker-active': selectedActiveMarkerColor,
			'--color-cluster': selectedClusterColor,
			'--color-marker-search': selectedSearchColor,
			'--color-marker-geolocation': selectedGeolocationColor
		}
	}
}
