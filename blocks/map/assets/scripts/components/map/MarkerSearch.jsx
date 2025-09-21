import Icon from './Icon'

export default function MarkerSearch(data, ref, haveShadow) {
	const { label, x, y } = data

	return (
		<Marker ref={ref} icon={Icon('search', haveShadow)} position={[y, x]}>
			<Popup>
				<div>
					<strong>{label}</strong>
				</div>
			</Popup>
		</Marker>
	)
}
