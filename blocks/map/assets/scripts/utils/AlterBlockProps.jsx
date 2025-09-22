export default function AlterBlockProps(blockProps = {}, attributes) {
	const {
		selectedActiveMarkerColor,
		selectedClusterColor,
		selectedClusterTextColor,
		selectedGeolocationColor,
		selectedMarkerClusterSize,
		selectedMarkerColor,
		selectedMarkerSize,
		selectedSearchColor
	} = attributes

	return {
		...blockProps,
		style: {
			...blockProps.style,
			'--marker-size': selectedMarkerSize,
			'--cluster-size': selectedMarkerClusterSize,
			'--color-marker': selectedMarkerColor,
			'--color-marker-active': selectedActiveMarkerColor,
			'--color-cluster': selectedClusterColor,
			'--color-cluster-text': selectedClusterTextColor,
			'--color-marker-search': selectedSearchColor,
			'--color-marker-geolocation': selectedGeolocationColor
		}
	}
}
