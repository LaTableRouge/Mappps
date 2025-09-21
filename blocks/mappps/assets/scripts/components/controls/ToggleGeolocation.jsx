import { __ } from '@wordpress/i18n'

export default function ToggleGeolocation({ defaultValue, setAttributes }) {
	// See here : https://codesandbox.io/s/how-to-locate-react-leaflet-v3x-map-to-users-current-position-and-get-the-borders-for-this-map-g1onh?file=/src/App.js:410-431
	return (
		<ToggleControl
			checked={defaultValue}
			help={defaultValue ? __('Users will be able to geolocate themselves', 'mappps') : ''}
			label={__('Geolocation', 'mappps')}
			onChange={(value) => {
				setAttributes({ isGeolocated: value })
			}}
		/>
	)
}
